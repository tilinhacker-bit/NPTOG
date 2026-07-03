// DATA object exactly as specified
const DATA = {
    duties: {
        A: { 7: [1,5,9,13,16,19,22,25,29], 8: [1,4,7,11,14,17,20,23,25], 9: [11,15,19,23,27] },
        B: { 7: [2,6,10,14,17,20,23,27,30], 8: [2,5,8,10,27,30], 9: [2,5,8,12,16,20,24,28] },
        C: { 7: [3,7,12,15,18,21,24,26], 8: [12,15,18,21,24,28,31], 9: [3,6,9,13,17,21,25,29] },
        D: { 7: [4,8,11,28,31], 8: [3,6,9,13,16,19,22,26,29], 9: [1,4,7,10,14,18,22,26,30] }
    },
    nightOffs: {
        A: { 7: [2,6,10,14,17,20,23,26,30], 8: [2,5,8,12,15,18,21,24,26], 9: [12,16,20,24,28] },
        B: { 7: [3,7,11,15,18,21,24,28,31], 8: [3,6,9,11,28,31], 9: [3,6,9,13,17,21,25,29] },
        C: { 7: [4,8,13,16,19,22,25,27], 8: [13,16,19,22,25,29], 9: [1,4,7,10,14,18,22,26,30] },
        D: { 7: [1,5,9,12,29], 8: [1,4,7,10,14,17,20,23,27,30], 9: [2,5,8,11,15,19,23,27] }
    },
    anesBlocks: {
        A: { startM: 8, startD: 27, endM: 9, endD: 10 },
        B: { startM: 8, startD: 12, endM: 8, endD: 26 },
        C: { startM: 7, startD: 28, endM: 8, endD: 11 },
        D: { startM: 7, startD: 13, endM: 7, endD: 27 }
    },
    dailyInfo: {
        "2026-07-06": { SCS: "Dr. Wah Wah Win Hlaing", JCS: "-", SAS: "Dr. Linn Bo", AS_short: "Gp 3 (Dr TKW & Dr NLO)", AS: "Group 3", WR: { postop: "Dr TKW", pn: "Dr NLO" }, Med_name: "SAS Dr. Kay Kay Khine", Med_phone: "09 765 005 367" },
        "2026-07-07": { SCS: "Dr. Myat Myat Aung", JCS: "Dr. Darli Nyein Chan", SAS: "Dr. Cho May Mi Htet Naung", AS_short: "Gp 1 (Dr HMMM & Dr NSDT)", AS: "Group 1", WR: { postop: "Dr MTK", pn: "Dr HMO" }, Med_name: "SAS Dr. Kay Kay Khine", Med_phone: "09 765 005 367" }
        // Note to AI: extrapolate the dailyInfo format to populate the UI. 
    },
    asGroups: {
        "Group 1": [ {name: "Dr. Han Myint Mo Mo", phone: "09261618203"}, {name: "Dr. Nang Sanda Htun", phone: "09262779715"} ],
        "Group 2": [ {name: "Dr. May Thu Khaing", phone: "09971170360"}, {name: "Dr. Hlaing Myo Oo", phone: "09894702485"} ],
        "Group 3": [ {name: "Dr. Thukha Wynn", phone: "09424752640"}, {name: "Dr. Nay Linn Oo", phone: "09793519374"} ]
    },
    hoGroups: {
        "A": [ {name: "Dr. Myat Min Khant", phone: "09440076868"}, {name: "Dr. Phoo Pyae Pyae Hlaing", phone: "09978144352"}, {name: "Dr. Phu Myat Thwe", phone: "09970743532"} ],
        "B": [ {name: "Dr. Myo Min Kyaw", phone: "09261463976"}, {name: "Dr. Myat Mon Mon Kyaw", phone: "092130724"}, {name: "Dr. May Thet Paing Kyaw", phone: "09424943829"} ],
        "C": [ {name: "Dr. Aung Kaung Thant Kyaw", phone: "09660160164"}, {name: "Dr. Dazen Kyaw", phone: "09780920988"}, {name: "Dr. Hsu Mon Kyaw", phone: "09445144704"} ],
        "D": [ {name: "Dr. Kaung Myat Htal", phone: "09420707474"}, {name: "Dr. Mon Mon Thant", phone: "09789686980"}, {name: "Dr. Mon Mon Theint Kyaw", phone: "09452887045"} ]
    }
};
window.DATA = DATA;
export default DATA;