if (!localStorage.getItem("demoDataLoaded")) {
    const demoUsers = [
    {
    username: "👑 Huy Quang",
    email: "admin",
    password:"1",
    luong:9999999,
    history: [{"time": "2006-09-27T17:00:00.315Z","luong": 9999999,"vnd": 0,}],
    },
    {
    username: "Dũnggg",
    email: "vip2@demo.cbrt",
    history: [{ luong: 50000 }],
    },
    {
    username: "Saidepchiu",
    email: "vip3@demo.cbrt",
    history: [{ luong: 158250 }],
    },

    {
    username: "LD Thànhh",
    email: "vip4@demo.cbrt",
    history: [{ luong: 200000 }],
    },
    {
    username: "Dang Hai",
    email: "vip5@demo.cbrt",
    history: [{ luong: 327500 }],
    },
    {
    username: "LQC-Nopee",
    email: "vip6@demo.cbrt",
    history: [{ luong: 482750 }],
    },
    {
    username: "Hẹ Hẹ Hẹ",
    email: "vip7@demo.cbrt",
    history: [{ luong: 32250 }],
    },
    {
    username: "chillboy",
    email: "vip8@demo.cbrt",
    history: [{ luong: 124250 }],
    },
    {
    username: "admin",
    email: "vip9@demo.cbrt",
    history: [{ luong: 1250 }],
    },
];

const Users = JSON.parse(localStorage.getItem("users")) || [];
const allUsers = [...Users, ...demoUsers];
localStorage.setItem("users", JSON.stringify(allUsers));
localStorage.setItem("demoDataLoaded", "true"); 
}