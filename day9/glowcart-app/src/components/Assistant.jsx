import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export default function Assistant({ onOpenQuiz, onOpenShadeFinder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Bonjour! I am your Luminesse Beauty Concierge. 🌟 I can guide you to find the perfect lipstick shade, build a clinical skincare routine, or resolve skin concerns. How may I assist you today?"
    }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSuggestionClick = (actionText, actionKey) => {
    // Add user message
    const userMsg = { sender: 'user', text: actionText };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let botResponse = '';
      if (actionKey === 'quiz') {
        botResponse = "Excellent choice! Our Skin Type Quiz takes under 2 minutes. It analyzes morning oiliness and primary targets to recommend tailored items. Click here to launch the quiz!";
        onOpenQuiz();
      } else if (actionKey === 'shade') {
        botResponse = "Perfect. The Shade Finder maps your skin undertone (Cool, Neutral, Warm) to our Soft Focus foundation ranges. Click here to open the Shade Finder!";
        onOpenShadeFinder();
      } else if (actionKey === 'promo') {
        botResponse = "We have an active celebration! Use checkout code LUMINESSE20 to secure 20% OFF your entire bag. We also wrap everything in our hand-tied satin signature gift box for free on orders over $75.";
      } else if (actionKey === 'routine') {
        botResponse = "A classic luxury routine involves: 1. Centella Foaming Cleanser, 2. Hyaluronic Acid B5 Serum, 3. Ceramide Barrier Cream, and 4. Daily Defense Sunscreen SPF 50+. Use our Routine Builder in the navbar to assemble your personalized schedule!";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.toLowerCase();
    const userMsg = { sender: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let response = "I'm checking that for you! For specialized diagnostics, I highly recommend using the Skin Quiz or the Shade Finder in the navbar. Alternatively, you can browse Makeup, Skincare, or Fragrances from our top navigation.";

      if (query.includes('discount') || query.includes('promo') || query.includes('coupon') || query.includes('offer')) {
        response = "Unlock 20% savings today using coupon code: LUMINESSE20 at checkout. It applies to all cosmetics, clinical serums, and fragrances!";
      } else if (query.includes('ship') || query.includes('delivery') || query.includes('track')) {
        response = "We offer FREE standard delivery on orders over $50. For smaller bags, shipping is a flat $7.95. Delivery typically completes within 3 to 5 business days.";
      } else if (query.includes('skin') || query.includes('dry') || query.includes('oily') || query.includes('quiz')) {
        response = "To analyze skin concerns, open our interactive Skin Type Quiz! It is available on the navigation bar or simply click here to launch it.";
      } else if (query.includes('shade') || query.includes('lipstick') || query.includes('foundation') || query.includes('color')) {
        response = "Finding the right tone is simple with our Shade Finder tool. Match cool, neutral, or warm undertones to the perfect formula. Tap Shade Finder in the menu to try it!";
      } else if (query.includes('points') || query.includes('reward') || query.includes('loyalty')) {
        response = "Every dollar spent credits 1 point to your profile. Accumulate points to climb from Bronze Beauty to Gold Radiant and eventually Platinum Luminary for exclusive early launches!";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
    }, 700);
  };

  return (
    <>
      {/* Floating button */}
      <button className="assistant-trigger animate-float" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <MessageSquare />}
      </button>

      {/* Chat pane */}
      {isOpen && (
        <div className="assistant-chat">
          <div className="chat-header">
            <div className="chat-bot-identity">
              <div className="chat-bot-avatar flex-center">
                <Sparkles size={14} />
              </div>
              <div className="chat-bot-info">
                <h3>Beauty Concierge</h3>
                <span>• Online Assistance</span>
              </div>
            </div>
            <button style={{ color: 'var(--c-primary)' }} onClick={() => setIsOpen(false)}>
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="chat-suggestions">
            <button className="chat-suggest-chip" onClick={() => handleSuggestionClick("Take Skin Quiz", "quiz")}>Skin Quiz</button>
            <button className="chat-suggest-chip" onClick={() => handleSuggestionClick("Match Foundation", "shade")}>Shade Finder</button>
            <button className="chat-suggest-chip" onClick={() => handleSuggestionClick("What's the promo code?", "promo")}>Offers Code</button>
            <button className="chat-suggest-chip" onClick={() => handleSuggestionClick("Suggest Skincare Steps", "routine")}>Skincare Tips</button>
          </div>

          {/* Text Input */}
          <form className="chat-input-row" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Ask about shipping, coupons, shades..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="chat-send-btn">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
