import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// Understands: English + Bisaya + Filipino + shortcuts
// Responds in: English
const KB = [
  {
    id: 'greeting',
    patterns: ['hello','hi','hey','sup','yo','hoy','oi','uy','good morning','good afternoon','good evening','good night','kumusta','musta','kamusta','maayong buntag','maayong hapon','maayong gabii','maayong adlaw','greetings','start','help','tulong'],
    answer: 'Hey there! 👋 Welcome to **Sunset Cafe**! I\'m **Brew**, your virtual assistant.\n\nWhat can I help you with today? 😊',
    quickReplies: ['Menu & Drinks 🥤', 'Location 📍', 'Hours ⏰', 'How to Order 🛒'],
  },
  {
    id: 'hours',
    patterns: ['hour','hours','open','close','closing','time','schedule','when','bukas','sarado','aberto','oras','anong oras','what time','unsang oras','kanus-a','pila ka oras','hrs?','sched?','time?','open?','close?'],
    answer: '🕐 **Opening Hours:**\n\nOpen **every day** — **5:00 PM to 12:00 AM** (midnight)\n\nBoth branches (Gingoog City & Medina) have the same hours. See you in the evening! 🌙',
    quickReplies: ['Location 📍', 'How to Order 🛒'],
  },
  {
    id: 'location',
    patterns: ['location','locate','address','find','place','where','branch','branches','store','stores','brgy','barangay','saan','asa','diin','taga','nasaan','naa','naa sila','asa sila','loc','add','loc?','add?','where?','branch?','asa?','saan?'],
    answer: '📍 We have **2 branches:**\n\n🏪 **Brgy 23 — Gingoog City**\nNational Highway, Villahermosa Slot\nMini Sports Complex\nCoords: 8.822619, 125.101576\n\n🏪 **Medina Cart**\nMedina, Misamis Oriental\nCoords: 8.912873, 125.023833\n\nBoth open 5PM–12AM daily! 🌙',
    quickReplies: ['Hours ⏰', 'Gingoog Branch', 'Medina Branch', 'View Map 🗺️'],
    action: { label: 'View Map 🗺️', path: '/find-a-store' },
  },
  {
    id: 'gingoog',
    patterns: ['gingoog','gingog','ginoog','brgy 23','villahermosa','sports complex','main branch','main cart'],
    answer: '📍 **Gingoog City Branch:**\n\nBrgy 23, National Highway\nVillahermosa Slot, Mini Sports Complex\nGingoog City, Misamis Oriental\n\n📌 Coords: 8.822619, 125.101576\n🕐 5:00 PM – 12:00 AM daily\n💳 Cash & GCash accepted',
    quickReplies: ['Medina Branch', 'How to Order 🛒', 'View Map 🗺️'],
    action: { label: 'View on Map', path: '/find-a-store' },
  },
  {
    id: 'medina',
    patterns: ['medina','medena'],
    answer: '📍 **Medina Branch:**\n\nMedina, Misamis Oriental\n\n📌 Coords: 8.912873, 125.023833\n🕐 5:00 PM – 12:00 AM daily\n💳 Cash & GCash accepted',
    quickReplies: ['Gingoog Branch', 'How to Order 🛒', 'View Map 🗺️'],
    action: { label: 'View on Map', path: '/find-a-store' },
  },
  {
    id: 'menu',
    patterns: ['menu','drink','drinks','available','offer','serve','list','what do you have','what you got','ano meron','ano','inumin','unsa','unsa ang','unsa imong','unsa naa','products','items','menu?','drinks?','list?'],
    answer: '🥤 **Sunset Cafe Menu:**\n\n☕ **Latte Series** (10 drinks)\nWhite Choco Latte, Spanish Latte, Americano, Matcha Milk, Hazelnut Latte, Caramel Macchiato, French Vanilla Latte, Strawberry Milk, Strawberry Matcha, Matcha Latte\n\n🍹 **Fruity Soda Series** (4 flavors)\n🍓 Strawberry · 🍇 Grape · 🍏 Green Apple · 🫐 Blueberry\n\nPrices range from ₱55–₱70 only! 💰',
    quickReplies: ['Prices 💰', 'Best Sellers ⭐', 'Order Now 🛒'],
    action: { label: 'Order Online', path: '/order' },
  },
  {
    id: 'price',
    patterns: ['price','prices','cost','how much','peso','₱','cheap','affordable','magkano','presyo','pila','pila ang','tag pila','tagpila','mahal','barato','discount','price?','cost?','pila?','magkano?'],
    answer: '💰 **Our prices — very affordable!**\n\n☕ **Latte Series:**\n• Americano — ₱55\n• Spanish Latte — ₱60\n• Strawberry Milk — ₱60\n• Matcha Milk — ₱65\n• Hazelnut Latte — ₱65\n• White Choco Latte — ₱65\n• French Vanilla Latte — ₱65\n• Matcha Latte — ₱65\n• Caramel Macchiato — ₱70\n• Strawberry Matcha — ₱70\n\n🍹 **Fruity Sodas — ₱55 each**\n\nGreat value for every sip! 😄',
    quickReplies: ['Order Now 🛒', 'Best Sellers ⭐'],
  },
  {
    id: 'latte',
    patterns: ['latte','coffee','espresso','white chocolate','white choco','french vanilla','hazelnut','kape','kopi','latte series'],
    answer: '☕ **Latte Series** — 10 drinks:\n\n• White Chocolate Latte — ₱65\n• Spanish Latte — ₱60 ⭐\n• Americano — ₱55\n• Matcha Milk — ₱65\n• Hazelnut Latte — ₱65\n• Caramel Macchiato — ₱70 ⭐\n• French Vanilla Latte — ₱65\n• Strawberry Milk — ₱60\n• Strawberry Matcha — ₱70\n• Matcha Latte — ₱65\n\n⭐ = customer favorites!',
    quickReplies: ['Fruity Sodas 🍹', 'Order Now 🛒'],
  },
  {
    id: 'soda',
    patterns: ['soda','fruity','fruit','grape','apple','blueberry','sparkling','bubbly','fruity soda','soda series'],
    answer: '🍹 **Fruity Soda Series** — all ₱55 each!\n\n🍓 Strawberry Soda\n🍇 Grape Soda\n🍏 Green Apple Soda\n🫐 Blueberry Soda\n\nMade with real fruit flavors and sparkling soda. Perfect for hot days! 😋',
    quickReplies: ['Latte Series ☕', 'Order Now 🛒'],
  },
  {
    id: 'matcha',
    patterns: ['matcha','green tea','greentea'],
    answer: '🍵 **Our matcha drinks:**\n\n• Matcha Milk — ₱65\n• Matcha Latte — ₱65\n• Strawberry Matcha — ₱70 ⭐\n\nAll made with ceremonial matcha powder. The Strawberry Matcha is a fan favorite — a beautiful two-tone drink! 😍',
    quickReplies: ['Order Now 🛒', 'Full Menu 🥤'],
  },
  {
    id: 'strawberry',
    patterns: ['strawberry','straw','presa'],
    answer: '🍓 **Our strawberry drinks:**\n\n• Strawberry Milk — ₱60 (creamy & sweet)\n• Strawberry Matcha — ₱70 (two-tone, Instagrammable!)\n• Strawberry Soda — ₱55 (bubbly & refreshing)\n\nAll three are amazing — try them all! 😄',
    quickReplies: ['Order Now 🛒', 'Full Menu 🥤'],
  },
  {
    id: 'bestseller',
    patterns: ['best','recommend','popular','favorite','top','bestseller','subok','try','unsa ang paborito','paborito','best seller','most ordered','trending','viral','what to order','ano order','best?','rec?','fave?','top?'],
    answer: '⭐ **Top picks based on customer reviews:**\n\n🥇 Spanish Latte — ₱60\n🥈 Caramel Macchiato — ₱70\n🥉 Strawberry Soda — ₱55\n4️⃣ Matcha Latte — ₱65\n5️⃣ Strawberry Matcha — ₱70\n\nHonestly, everything on the menu is worth trying! You won\'t regret it. 😄',
    quickReplies: ['Order Now 🛒', 'Full Menu 🥤'],
    action: { label: 'Order Now', path: '/order' },
  },
  {
    id: 'order',
    patterns: ['order','buy','purchase','pickup','pick up','how to order','mag order','pabili','palit','palita','gusto ko','gusto','i want','can i order','pwede mag order','pwede','pede','order?','buy?','how?'],
    answer: '🛒 **How to order:**\n\n1️⃣ Go to our **Order** page\n2️⃣ Pick your drinks\n3️⃣ Choose your branch (Gingoog or Medina)\n4️⃣ Enter your details\n5️⃣ Pay via **GCash** + enter reference number\n6️⃣ Pick up at the cart!\n\n⚠️ **Pickup only** — no delivery yet.\n\nEasy and fast! 🎉',
    quickReplies: ['Payment 💳', 'Location 📍'],
    action: { label: 'Order Now 🛒', path: '/order' },
  },
  {
    id: 'delivery',
    patterns: ['delivery','deliver','papadala','padala','hatid','makahatid','pwede padala','free delivery','delivery fee'],
    answer: '🚫 **No delivery yet** at the moment.\n\n**Pickup only** — come grab your order at the cart!\n\n📍 Gingoog City: Brgy 23, Mini Sports Complex\n📍 Medina: Medina, Misamis Oriental\n\nBoth open 5PM–12AM! 🌙',
    quickReplies: ['Location 📍', 'How to Order 🛒'],
  },
  {
    id: 'payment',
    patterns: ['payment','pay','gcash','cash','card','bayad','paano magbayad','paano bayad','bayaran','how to pay','accepted','accept','pay?','bayad?','gcash?','cash?'],
    answer: '💳 **Payment methods:**\n\n• **GCash** — scan QR at checkout (for online orders)\n• **Cash** — pay at the cart on pickup\n\nFor online orders, GCash payment is required before pickup. Scan → Send → Enter reference number. Simple! 😊',
    quickReplies: ['How to Order 🛒', 'Location 📍'],
  },
  {
    id: 'franchise',
    patterns: ['franchise','franchis','own','business','invest','partner','negosyo','mamuhunan','mag negosyo','puwede mag franchise','how to franchise','franchise info','packages','package','franchise?','negosyo?','invest?'],
    answer: '🤝 **Franchise Sunset Cafe!**\n\n3 packages available:\n\n📦 **Starter Cart** — ₱25,000\n📦 **Growth Package** — ₱45,000 ⭐ Most Popular\n📦 **Multi-Cart** — ₱80,000\n\nIncludes: cart setup, training, branding & support!\n\nMost franchisees recover their investment in 3–6 months! 💪',
    quickReplies: ['Apply Now', 'Tell me more'],
    action: { label: 'View Packages', path: '/franchise' },
  },
  {
    id: 'contact',
    patterns: ['contact','reach','email','message','call','feedback','suggestion','tanong','question','complaint','concern','social media','facebook','fb','instagram','ig','contact?','msg?','fb?'],
    answer: '📩 **Contact Sunset Cafe:**\n\n• Visit our **Contact** page to send a message\n• Follow us on social media **@SunsetCafe**\n• Or just come visit us at the cart!\n\nWe\'d love to hear from you. 😊',
    quickReplies: ['Location 📍', 'Hours ⏰'],
    action: { label: 'Contact Us', path: '/contact' },
  },
  {
    id: 'about',
    patterns: ['about','story','history','founder','owner','who','dwight','kervy','started','mission','vision','background','unsa ang sunset cafe','kinsa','kinsa ang','sino','sino ang','about?','who?'],
    answer: '☕ **About Sunset Cafe:**\n\nFounded by **Dwight Ramos** and **Kervy Y. Rubio** — two passionate locals who wanted to bring affordable, quality drinks to Gingoog City.\n\n🎯 **Mission:** Accessible, affordable, high-quality cafe services anytime, anywhere.\n\n🌟 **Vision:** A trusted, growing cafe brand with multiple cart locations across Mindanao.',
    quickReplies: ['Our Menu 🥤', 'Franchise Info 🤝'],
    action: { label: 'Our Story', path: '/about' },
  },
  {
    id: 'review',
    patterns: ['review','rating','rate','feedback','comment','mag review','mag rate','sulat review','mag comment','review?','rate?'],
    answer: '⭐ **Want to leave a review?**\n\nHead to our **Home page** — scroll down to the Ratings & Reviews section!\n\nShare your experience and help other customers. Thank you! 🙏',
    quickReplies: ['Order Now 🛒', 'Contact Us 📩'],
  },
  {
    id: 'wifi',
    patterns: ['wifi','wi-fi','internet','connection','signal'],
    answer: 'We\'re an outdoor cart setup, so **no WiFi** at the moment. 😅\n\nBut our drinks will definitely boost your mood! ☕😄',
    quickReplies: ['Menu 🥤', 'Location 📍'],
  },
  {
    id: 'compliment',
    patterns: ['nice','great','awesome','amazing','love','ganda','maganda','nindot','lami','masarap','sarap','galing','maayo','perfect','excellent'],
    answer: 'Thank you so much! 🥰 That really means a lot to us!\n\nOur goal is to make every sip worth it. Come visit us again soon! ☕',
    quickReplies: ['Order Now 🛒', 'Best Sellers ⭐'],
  },
  {
    id: 'thanks',
    patterns: ['thank','thanks','thank you','ty','thx','salamat','daghang salamat','maraming salamat','pasalamat','appreciate','tnx','thnks'],
    answer: 'You\'re welcome! 😊 Thank you for visiting Sunset Cafe!\n\nEnjoy your drinks and see you soon! ☕🌅',
    quickReplies: ['Order Now 🛒', 'Location 📍'],
  },
  {
    id: 'bye',
    patterns: ['bye','goodbye','see you','later','paalam','sige','ok sige','ingna','cya','c ya','take care','tc'],
    answer: 'See you soon! 👋 Remember, we\'re open **5PM–12AM every day**!\n\nStay refreshed, stay cool! ☕🌙',
    quickReplies: [],
  },
]

function getReply(input) {
  const lower = input.toLowerCase().trim()
  for (const item of KB) {
    if (item.patterns.some(p => lower.includes(p))) return item
  }
  // Fuzzy word match
  const words = lower.split(/\s+/)
  for (const item of KB) {
    for (const pattern of item.patterns) {
      for (const word of words) {
        if (word.length > 2 && pattern.includes(word)) return item
      }
    }
  }
  return {
    answer: 'Hmm, I\'m not sure about that one! 😅\n\nTry asking about:\n• **Menu** or **drinks**\n• **Location** or **loc?**\n• **Hours** or **open?**\n• **Price** or **magkano?**\n• **How to order**\n• **Franchise** info\n\nOr visit our **Contact** page for a personal response! 😊',
    quickReplies: ['Menu 🥤', 'Location 📍', 'Hours ⏰', 'Order 🛒'],
  }
}

const SUGGESTIONS = ['Menu? 🥤', 'Loc? 📍', 'Open? ⏰', 'Magkano? 💰', 'Best sellers ⭐']

function formatText(text) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/\*\*(.*?)\*\*/g)
    return (
      <span key={i}>
        {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
        {i < arr.length - 1 && <br />}
      </span>
    )
  })
}

function getTime() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{
    from: 'bot',
    text: 'Hey! 👋 I\'m **Brew**, the Sunset Cafe assistant.\n\nAsk me anything — I understand English, Bisaya, Filipino, and shortcuts like **loc?**, **open?**, **magkano?** 😊',
    time: getTime(),
    quickReplies: ['Menu? 🥤', 'Loc? 📍', 'Open? ⏰', 'Order? 🛒'],
  }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(0)
  const [minimized, setMinimized] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open && !minimized) {
      setUnread(0)
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    }
  }, [open, minimized, messages])

  useEffect(() => {
    if (open && !minimized) inputRef.current?.focus()
  }, [open, minimized])

  const send = useCallback((text) => {
    const msg = (text || input).trim()
    if (!msg) return
    setInput('')
    setMessages(m => [...m, { from: 'user', text: msg, time: getTime() }])
    setTyping(true)
    setTimeout(() => {
      const reply = getReply(msg)
      setMessages(m => [...m, {
        from: 'bot', text: reply.answer, time: getTime(),
        quickReplies: reply.quickReplies || [], action: reply.action || null,
      }])
      setTyping(false)
      if (!open || minimized) setUnread(u => u + 1)
    }, 500 + Math.random() * 400)
  }, [input, open, minimized])

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }
  const handleAction = (path) => { navigate(path); setOpen(false) }
  const clearChat = () => setMessages([{
    from: 'bot', text: 'Chat cleared! 🧹 How can I help you?', time: getTime(),
    quickReplies: ['Menu? 🥤', 'Loc? 📍', 'Open? ⏰', 'Order? 🛒'],
  }])

  return (
    <>
      <button className="chatbot-fab" onClick={() => { setOpen(o => !o); setMinimized(false) }} aria-label="Open chat">
        <span className="chatbot-fab-icon">{open ? '✕' : '💬'}</span>
        {!open && unread > 0 && <span className="chatbot-unread">{unread}</span>}
      </button>

      {open && (
        <div className={`chatbot-window${minimized ? ' chatbot-minimized' : ''}`}>
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar-wrap">
                <div className="chatbot-avatar">☕</div>
                <span className="chatbot-online-dot" />
              </div>
              <div>
                <span className="chatbot-name">Brew</span>
                <span className="chatbot-status">Sunset Cafe Assistant · Online</span>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button className="chatbot-header-btn" onClick={clearChat} title="Clear chat">🗑</button>
              <button className="chatbot-header-btn" onClick={() => setMinimized(m => !m)} title="Minimize">{minimized ? '▲' : '▼'}</button>
              <button className="chatbot-header-btn" onClick={() => setOpen(false)} title="Close">✕</button>
            </div>
          </div>

          {!minimized && (
            <>
              <div className="chatbot-messages">
                {messages.map((m, i) => (
                  <div key={i} className={`chatbot-msg chatbot-msg-${m.from}`}>
                    {m.from === 'bot' && <div className="chatbot-msg-avatar-sm">☕</div>}
                    <div className="chatbot-msg-content">
                      <div className="chatbot-bubble">{formatText(m.text)}</div>
                      {m.action && (
                        <button className="chatbot-action-btn" onClick={() => handleAction(m.action.path)}>
                          {m.action.label} →
                        </button>
                      )}
                      {m.quickReplies?.length > 0 && i === messages.length - 1 && !typing && (
                        <div className="chatbot-quick-replies">
                          {m.quickReplies.map(qr => (
                            <button key={qr} className="chatbot-quick-reply" onClick={() => send(qr)}>{qr}</button>
                          ))}
                        </div>
                      )}
                      <span className="chatbot-time">{m.time}</span>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="chatbot-msg chatbot-msg-bot">
                    <div className="chatbot-msg-avatar-sm">☕</div>
                    <div className="chatbot-msg-content">
                      <div className="chatbot-bubble chatbot-typing"><span /><span /><span /></div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="chatbot-suggestions">
                {SUGGESTIONS.map(s => (
                  <button key={s} className="chatbot-suggestion" onClick={() => send(s)}>{s}</button>
                ))}
              </div>

              <div className="chatbot-input-row">
                <input
                  ref={inputRef}
                  type="text"
                  className="chatbot-input"
                  placeholder="Ask me anything... (loc? open? magkano?)"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  maxLength={200}
                />
                <button className="chatbot-send" onClick={() => send()} disabled={!input.trim()} aria-label="Send">➤</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
