import bcrypt from 'bcryptjs';

const users = [
  {
    name: "Admin",
    email: "admin@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: "John Doe",
    email: "johndoe@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Jane Doe",
    email: "janedoe@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: "Adrien Olichon",
    email: "adrienolichon@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Angela Hutchinson",
    email: "angelahutchinson@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Anni Roenkae",
    email: "anniroenkae@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Diana Dids",
    email: "dianadids@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Elina Araja",
    email: "johndoe@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Engin Akyurt",
    email: "enginakyurt@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Giovanni Varden",
    email: "giovannivarden@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Rasmindo Sitepu",
    email: "rasmindositepu@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Jon Bagnato",
    email: "jonbagnato@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Jung Hua Liu",
    email: "junghualiu@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Kseniya Lapteva",
    email: "kseniyalapteva@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Merlin Lightpainting",
    email: "merlinlightpainting@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Jot Singh",
    email: "jotsingh@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Nick Collins",
    email: "nickcollins@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Oleksandra Zhyvytsia",
    email: "oleksandrazhyvytsia@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Paul Blenkhorn",
    email: "paulblenkhorn@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Refar Gotohp",
    email: "refargotohp@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Scott Webb",
    email: "scottwebbn@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Sharon Snider",
    email: "sharonsnider@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Steve Johnson",
    email: "stevejohnson@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: "Suzy Hazelwood",
    email: "suzyhazelwood@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Craig Adderley",
    email: "craigadderley@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Trace Hudson",
    email: "tracehudson@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Turgay Koca",
    email: "turgaykoca@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: "Zak Sheuskaya",
    email: "zaksheuskaya@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
];

export default users;