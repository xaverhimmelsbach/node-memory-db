export type Song = {
  title: string;
  artist: string;
  runtime: number;
  release: Date;
}

export function genSongs(amount: number): Song[] {
  return new Array(amount).fill(null).map<Song>((_, i) => {
    const titleParts = (i % 3) + 2
    const title = new Array(titleParts).fill(null).map((_, idx) => TitleSnippets[(((idx + 1) * (i + 1)) % TitleSnippets.length)]).join(" ")
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

const TitleSnippets: string[] = [
  "Let", "It", "Be", "Come", "Together", "A", "Day", "In", "The", "Life"
]

const Artists: string[] = [
  "The Beatles",
  "Red Hot Chili Peppers",
  "The Jimi Hendrix Experience",
]
