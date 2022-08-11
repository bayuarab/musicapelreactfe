let music = [
  {
    id: "1",
    name: "Drum",
    deskripsi:'ini adalah kursus untuk melatih bakat anda semua dalam bidang drum',
    image:"../aset/images/drum1.jpg",
  },
  {
    id: "2",
    name: "Gitar",
    deskripsi:'ini adalah kursus untuk melatih bakat anda semua dalam bidang gitar',
    image:"../aset/images/gitar.jpg",
  },
  {
    id: "3",
    name: "Biola",
    deskripsi:'ini adalah kursus untuk melatih bakat anda semua dalam bidang biola',
    image:"../aset/images/biola.jpg",
  },
];

let kategoriKelas = [
  {
    id: "1",
    name: "Drum Untuk Coach",
    description: "merupakan sebuah kelas kepelatihan untuk seseorang",
    kelas: "Drum",
    kelas_id: "1",
    price: 8500000,
    image:"../aset/images/drum.png",
  },
  {
    id: "2",
    name: "Drum Untuk Pemula",
    description: "merupakan sebuah kelas kepelatihan untuk seseorang yang belum sama sekali mengerti tentang basic drum",
    kelas: "Drum",
    kelas_id: "1",
    price: 6608000,
    image:"../aset/images/drum1.jpg",
  },
];

export function getMusic() {
  return music;
}
export function getKategoriKelas() {
  return kategoriKelas;
}

