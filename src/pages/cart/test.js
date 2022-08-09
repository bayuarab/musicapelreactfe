const listsCart = [
  {
    id_product: "1",
    course_category_id: "1",
    course_category: "Drum",
    course_name: "Kursus Drummer Special Coach (Eno Netral)",
    price: 8500000,
    schedule: "Senin, 25 Juli 2022",
  },
  {
    id_product: "2",
    course_category_id: "1",
    course_category: "Drum",
    course_name: "Intermediate Drum",
    price: 5500000,
    schedule: "Sabtu, 23 Juli 2022",
  },
  {
    id_product: "3",
    course_category_id: "2",
    course_category: "Guitar",
    course_name: "Guitar from zero to hero",
    price: 11000000,
    schedule: "Rabu, 27 Juli 2022",
  },
  {
    id_product: "4",
    course_category_id: "2",
    course_category: "Guitar",
    course_name: "Guitar from hero to superhero",
    price: 21000000,
    schedule: "Minggu, 31 Juli 2022",
  },
];

const filteredArray = listsCart.filter((item) => {
  return item.price < 8000000;
});
