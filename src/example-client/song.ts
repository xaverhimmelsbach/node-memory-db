import * as crypto from "crypto"

export type Song = {
  title: string;
  artist: string;
  runtime: number;
  release: Date;
}

export function genSongs(amount: number): Song[] {
  return new Array(amount).fill(null).map<Song>((_, i) => {
    // Generate titles between 2 to 7 words long
    const titleParts = (i % 5) + 2
    const title = new Array(titleParts).fill(null).map((_, idx) => {
      const hash = crypto.createHash("sha256")
      const hexValue = hash.update(String(i)).update(String(idx)).digest("hex").substring(0, 4)
      const numberValue = parseInt(hexValue, 16)

      // Avalanche effect for single words of title
      return TitleSnippets2[numberValue % TitleSnippets2.length]
    }).join(" ")
    const artist = Artists[(i % Artists.length)]
    const runtime = (i % 231) + 90
    const release = new Date(1970, 0, 2)

    return {
      title: title,
      artist: artist,
      runtime: runtime,
      release: release,
    }
  })
}

const TitleSnippets2: string[] = [
  "Let", "It", "Be", "Come", "Together", "A", "Day", "In", "The", "Life", "Can't", "Stop", "Voodoo", "Child", "(Slight Return)",
  "I", "Get", "No", "Satisfaction", "Sympathy", "For", "Devil", "Here", "Comes", "Sun", "Yellow", "Submarine", "Purple", "Haze",
  "All", "Along", "Watchtower", "Scar", "Tissue", "Santeria", "Badfish", "Californication", "Dani", "California", "Otherside",
  "Island", "Sun", "Say", "It", "Ain't", "So", "Buddy", "Holly", "Too", "Deep", "Fat", "Lip", "Still", "Waiting", "Hell", "Song",
  "Pieces", "Sk8er", "Boi", "Wouldn't", "Be", "Nice", "Royals",
  "Bohemian", "Rhapsody", "Under", "Pressure", "We", "Will", "Rock", "You", "Another", "One", "Bites", "Dust", 
  "Sweet", "Child", "O'", "Mine", "Paradise", "City", "November", "Rain", "Stairway", "To", "Heaven",
  "Hotel", "California", "Take", "It", "Easy", "Life", "On", "Mars", "Space", "Oddity", "Heroes",
  "Smells", "Like", "Teen", "Spirit", "Come", "As", "You", "Are", "Lithium", "Black", "Hole", "Sun",
  "Creep", "High", "And", "Dry", "Paranoid", "Android", "Wonderwall", "Champagne", "Supernova",
  "Seven", "Nation", "Army", "Fell", "Love", "With", "Girl", "Lonely", "Boy", "Gold", "On", "Ceiling",
  "Mr.", "Brightside", "Somebody", "Told", "Me", "Use", "Somebody", "Sex", "On", "Fire", "Float", "On",
  "Feel", "Good", "Inc.", "Clint", "Eastwood", "Take", "Me", "Out", "No", "One", "Knows", "Reptilia",
  "Juicebox", "Last", "Nite", "Time", "Is", "Running", "Out", "Supermassive", "Black", "Hole",
  "Everlong", "My", "Hero", "Learn", "To", "Fly", "Best", "Of", "You", "Times", "Like", "These",
  "In", "Bloom", "Heart", "Shaped", "Box", "All", "Apologies", "Hey", "Jude", "While", "My", "Guitar", "Gently", "Weeps",
  "Lucy", "Sky", "With", "Diamonds", "Paint", "It", "Black", "Jumpin'", "Jack", "Flash", "Gimme", "Shelter",
  "Baba", "O'Riley", "Won't", "Get", "Fooled", "Again", "Pinball", "Wizard", "Don't", "Stop", "Believin'",
  "Livin'", "On", "Prayer", "You", "Give", "Love", "Bad", "Name", "Sweet", "Home", "Alabama",
  "Free", "Bird", "Simple", "Man", "Born", "To", "Run", "Dancing", "In", "Dark", "Thunder", "Road",
  "Eye", "Of", "Tiger", "Highway", "Hell", "Back", "Black", "Shoot", "Thrill", "T.N.T.", "Crazy", "Train",
  "Dream", "On", "Walk", "Way", "Whole", "Lotta", "Love", "Black", "Dog", "Rock", "And", "Roll",
  "Iris", "Name", "Slide", "Basket", "Case", "When", "I", "Come", "Around", "Good", "Riddance", "(Time Of Your Life)",
  "Holiday", "American", "Idiot", "Wake", "Me", "Up", "When", "September", "Ends", "Boulevard", "Of", "Broken", "Dreams",
  "Welcome", "Jungle", "Knocking", "Heaven's", "Door", "Civil", "War", "Sweetest", "Thing", "With", "Or", "Without", "You",
  "Where", "Streets", "Have", "No", "Name", "Vertigo", "Sunday", "Bloody", "Sunday", "I", "Still", "Haven't", "Found", "What", "I'm", "Looking", "For",
  "Radioactive", "Demons", "Believer", "Thunder", "Enemy", "Counting", "Stars", "Apologize", "Secrets", "Good", "Life",
  "Shape", "Of", "You", "Perfect", "Castle", "On", "Hill", "Bad", "Habits", "Thinking", "Out", "Loud",
  "Blinding", "Lights", "Save", "Your", "Tears", "Can't", "Feel", "My", "Face", "Starboy",
  "Take", "Care", "Hotline", "Bling", "Passionfruit", "God's", "Plan", "One", "Dance",
  "Rolling", "Deep", "Someone", "Like", "You", "Hello", "Set", "Fire", "Rain",
  "Old", "Town", "Road", "Sunflower", "Circles", "Rockstar", "Congratulations",
  "Shallow", "Poker", "Face", "Bad", "Romance", "Just", "Dance", "Born", "Way",
  "Uptown", "Funk", "Locked", "Out", "Heaven", "Grenade", "Just", "Way", "Are",
  "Call", "Me", "Maybe", "Complicated", "Girlfriend", "My", "Happy", "Ending",
  "Toxic", "Oops!", "Did", "It", "Again", "Hit", "Baby", "One", "More", "Time",
  "Since", "U", "Been", "Gone", "Because", "You", "Loved", "Me", "My", "Heart", "Will", "Go", "On"
];


const Artists: string[] = [
  "The Beatles",
  "Red Hot Chili Peppers",
  "The Jimi Hendrix Experience",
  "The Rolling Stones",
  "Avril Lavigne",
  "Weezer",
  "Lorde",
  "Britney Spears",
  "Bob Marley",
  "Sum41",
  "The White Stripes",
  "Oasis",
  "Blur",
]
