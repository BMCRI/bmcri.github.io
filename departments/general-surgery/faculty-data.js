const facultyData = [
    {
        srno: 1,
        name: "Dr. Radheshyam Modi",
        designation: "Professor",
        qual: "MBBS, MD",
        ugReg: "G-70643",
        pgReg: ""
    },
    {
        srno: 2,
        name: "Dr. Pavanben Paragbhai Chaudhary",
        designation: "Professor",
        qual: "MBBS, MD",
        ugReg: "G-36176",
        pgReg: ""
    },
    {
        srno: 3,
        name: "Dr. Jayesh Modi",
        designation: "Professor",
        qual: "MBBS, MS, DNB-URO",
        ugReg: "G-30708",
        pgReg: ""
    },
    {
        srno: 4,
        name: "Dr. Rajesh Jegoda",
        designation: "Professor",
        qual: "MBBS, MS",
        ugReg: "G-40711",
        pgReg: ""
    },
    {
        srno: 5,
        name: "Dr. Vipul Yagnik",
        designation: "Professor",
        qual: "MBBS, MS",
        ugReg: "G-30734",
        pgReg: ""
    },
    {
        srno: 6,
        name: "Dr. Sunil Joshi",
        designation: "Professor",
        qual: "MBBS, MS",
        ugReg: "G-12096",
        pgReg: ""
    },
    {
        srno: 7,
        name: "Dr. Hiren Judal",
        designation: "Professor",
        qual: "MBBS, MS",
        ugReg: "G-27661",
        pgReg: ""
    },
    {
        srno: 8,
        name: "Dr. Yogesh Swami",
        designation: "Professor",
        qual: "MBBS, MS, DNB-URO",
        ugReg: "G-50771",
        pgReg: ""
    },
    {
        srno: 9,
        name: "Dr. Vasant K Ganatra",
        designation: "Professor",
        qual: "MBBS, MS",
        ugReg: "G-14948",
        pgReg: ""
    },
    {
        srno: 10,
        name: "Dr. Rajesh H. Majithiya",
        designation: "Associate Professor",
        qual: "MBBS, MS",
        ugReg: "G-33792",
        pgReg: ""
    },
    {
        srno: 11,
        name: "Dr. Vishal K. Balat",
        designation: "Associate Professor",
        qual: "MBBS, MS",
        ugReg: "G-36281",
        pgReg: ""
    },
    {
        srno: 12,
        name: "Dr. Ramkrishna D. Darji",
        designation: "Associate Professor",
        qual: "MBBS, MS",
        ugReg: "G-50878",
        pgReg: ""
    },
    {
        srno: 13,
        name: "Dr. Ravi P Desai",
        designation: "Associate Professor",
        qual: "MBBS, MS",
        ugReg: "G-19846",
        pgReg: ""
    },
    {
        srno: 14,
        name: "Dr. Sureshkumar Patel",
        designation: "Associate Professor",
        qual: "MBBS, MS, MCH-CVTS",
        ugReg: "G-11518",
        pgReg: ""
    },
    {
        srno: 15,
        name: "Dr. Kalpesh K. Patel",
        designation: "Associate Professor",
        qual: "MBBS, MS",
        ugReg: "G-55228",
        pgReg: ""
    },
    {
        srno: 16,
        name: "Dr. Modh Foram Arvindbhai",
        designation: "Associate Professor",
        qual: "MBBS, MS",
        ugReg: "G-53637",
        pgReg: ""
    },
    {
        srno: 17,
        name: "Dr. Chirag Doshi",
        designation: "Assistant Professor",
        qual: "MBBS, MS, MCH-URO",
        ugReg: "G-17785",
        pgReg: ""
    },
    {
        srno: 18,
        name: "Dr. Sameer Marediya",
        designation: "Assistant Professor",
        qual: "MBBS, MS",
        ugReg: "G-54917",
        pgReg: ""
    },
    {
        srno: 19,
        name: "Dr. Aimanhusen Payala",
        designation: "Assistant Professor",
        qual: "MBBS, MS",
        ugReg: "G-62123",
        pgReg: ""
    },
    {
        srno: 20,
        name: "Dr. Kamleshkumar Ramabhai Patel",
        designation: "Assistant Professor",
        qual: "MBBS, MS, MCH-URO",
        ugReg: "G-49847",
        pgReg: ""
    },
    {
        srno: 21,
        name: "Dr. Amrut M Chaudhari",
        designation: "Assistant Professor",
        qual: "MBBS, MS",
        ugReg: "G-65602",
        pgReg: ""
    },
    {
        srno: 22,
        name: "Dr. Sarthak Shah",
        designation: "Assistant Professor",
        qual: "MBBS, DNB-CVTS",
        ugReg: "G-48956",
        pgReg: ""
    },
    {
        srno: 23,
        name: "Dr. Patel Jaykumar Amarabhai",
        designation: "Assistant Professor",
        qual: "MBBS, MS",
        ugReg: "G-62825",
        pgReg: ""
    },
    {
        srno: 24,
        name: "Dr. Harsh Trivedi",
        designation: "Assistant Professor",
        qual: "MBBS, MS",
        ugReg: "G-54721",
        pgReg: ""
    },
    {
        srno: 25,
        name: "Dr. Sureshbhai Dajabbhai Patel",
        designation: "Assistant Professor",
        qual: "MBBS, MS",
        ugReg: "G-30167",
        pgReg: ""
    },
    {
        srno: 26,
        name: "Dr. Chaudhary Rekhaben Pratapbhai",
        designation: "Senior Resident",
        qual: "MBBS, MS",
        ugReg: "G-74859",
        pgReg: ""
    },
    {
        srno: 27,
        name: "Dr. Chaudhary Narendra Harsangbhai",
        designation: "Senior Resident",
        qual: "MBBS",
        ugReg: "G-69743",
        pgReg: ""
    },
    {
        srno: 28,
        name: "Dr. Jinal M. Thakkar",
        designation: "Senior Resident",
        qual: "MBBS, MS",
        ugReg: "G-65841",
        pgReg: ""
    },
    {
        srno: 29,
        name: "Dr. Sanjay Patel",
        designation: "Senior Resident",
        qual: "MBBS, DNB",
        ugReg: "G-53000",
        pgReg: ""
    },
    {
        srno: 30,
        name: "Dr. Sarthak Sharma",
        designation: "Senior Resident",
        qual: "MBBS, MS",
        ugReg: "G-70992",
        pgReg: ""
    },
    {
        srno: 31,
        name: "Dr. Nupur M. Parmar",
        designation: "Senior Resident",
        qual: "MBBS, MS",
        ugReg: "G-75486",
        pgReg: ""
    },
    {
        srno: 32,
        name: "Dr. Chaudhary Hardik M",
        designation: "Senior Resident",
        qual: "MBBS, MS",
        ugReg: "G-78913",
        pgReg: ""
    },
    {
        srno: 33,
        name: "Dr. Patel Kautuk Narehkumar",
        designation: "Senior Resident",
        qual: "MBBS, MS",
        ugReg: "G-78913",
        pgReg: ""
    }
];