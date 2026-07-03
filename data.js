// ==========================================
// OG HUB - CONFIGURATION FILE
// ==========================================

const DATA = {
    // 1. CORE ROSTER RULES
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
    
    // 2. DAILY SENIOR DATA (July 2026)
    dailyInfo: {
        "2026-07-01": { SCS: "Dr. Myat Myat Aung", JCS: "-", SAS: "Dr. Kay Thi Myo Myint", AS: "Group 1", AS_short: "Gp 1 (Dr HMMM & Dr NSDT)", WR: null, Med_name: "SAS Dr. Yin Mon Aung", Med_phone: "09 799 969 997" },
        "2026-07-02": { SCS: "Dr. Win Min Than", JCS: "Dr. Darli Nyein Chan", SAS: "Dr. Linn Bo", AS: "Group 2", AS_short: "Gp 2 (Dr MTK & Dr HMO)", WR: null, Med_name: "SAS Dr. Yin Mon Aung", Med_phone: "09 799 969 997" },
        "2026-07-03": { SCS: "Dr. Wah Wah Win Hlaing", JCS: "-", SAS: "Dr. Cho May Mi Htet Naung", AS: "Group 3", AS_short: "Gp 3 (Dr TKW & Dr NLO)", WR: null, Med_name: "SAS Dr. Yin Mon Aung", Med_phone: "09 799 969 997" },
        "2026-07-04": { SCS: "Dr. Myat Myat Aung", JCS: "Dr. Aye Myint Thet", SAS: "Dr. Nay Aung Oo", AS: "Group 1", AS_short: "Gp 1 (Dr HMMM & Dr NSDT)", WR: null, Med_name: "SAS Dr. Yin Mon Aung", Med_phone: "09 799 969 997" },
        "2026-07-05": { SCS: "Dr. Myat Myat Aung", JCS: "-", SAS: "Dr. Kay Thi Myo Myint", AS: "Group 2", AS_short: "Gp 2 (Dr MTK & Dr HMO)", WR: null, Med_name: "SAS Dr. Kay Kay Khine", Med_phone: "09 765 005 367" },
        "2026-07-06": { SCS: "Dr. Wah Wah Win Hlaing", JCS: "-", SAS: "Dr. Linn Bo", AS: "Group 3", AS_short: "Gp 3 (Dr TKW & Dr NLO)", WR: { postop: "Dr TKW", pn: "Dr NLO" }, Med_name: "SAS Dr. Kay Kay Khine", Med_phone: "09 765 005 367" },
        "2026-07-07": { SCS: "Dr. Myat Myat Aung", JCS: "Dr. Darli Nyein Chan", SAS: "Dr. Cho May Mi Htet Naung", AS: "Group 1", AS_short: "Gp 1 (Dr HMMM & Dr NSDT)", WR: { postop: "Dr MTK", pn: "Dr HMO" }, Med_name: "SAS Dr. Kay Kay Khine", Med_phone: "09 765 005 367" },
        "2026-07-08": { SCS: "Dr. Win Min Than", JCS: "-", SAS: "Dr. Nay Aung Oo", AS: "Group 2", AS_short: "Gp 2 (Dr MTK & Dr HMO)", WR: { postop: "Dr HMMM", pn: "Dr NSDT" }, Med_name: "SAS Dr. Kay Kay Khine", Med_phone: "09 765 005 367" },
        "2026-07-09": { SCS: "Dr. Wah Wah Win Hlaing", JCS: "Dr. Aye Myint Thet", SAS: "Dr. Kay Thi Myo Myint", AS: "Group 3", AS_short: "Gp 3 (Dr TKW & Dr NLO)", WR: { postop: "Dr NLO", pn: "Dr TKW" }, Med_name: "SAS Dr. Nway Nay Chi Hlaing", Med_phone: "09 518 6364" },
        "2026-07-10": { SCS: "Dr. Myat Myat Aung", JCS: "-", SAS: "Dr. Linn Bo", AS: "Group 1", AS_short: "Gp 1 (Dr HMMM & Dr NSDT)", WR: { postop: "Dr HMO", pn: "Dr MTK" }, Med_name: "SAS Dr. Nway Nay Chi Hlaing", Med_phone: "09 518 6364" },
        "2026-07-11": { SCS: "Dr. Win Min Than", JCS: "-", SAS: "Dr. Cho May Mi Htet Naung", AS: "Group 2", AS_short: "Gp 2 (Dr MTK & Dr HMO)", WR: null, Med_name: "SAS Dr. Nway Nay Chi Hlaing", Med_phone: "09 518 6364" },
        "2026-07-12": { SCS: "Dr. Win Min Than", JCS: "Dr. Darli Nyein Chan", SAS: "Dr. Nay Aung Oo", AS: "Group 3", AS_short: "Gp 3 (Dr TKW & Dr NLO)", WR: null, Med_name: "SAS Dr. Nway Nay Chi Hlaing", Med_phone: "09 518 6364" },
        "2026-07-13": { SCS: "Dr. Myat Myat Aung", JCS: "-", SAS: "Dr. Kay Thi Myo Myint", AS: "Group 1", AS_short: "Gp 1 (Dr HMMM & Dr NSDT)", WR: { postop: "Dr MTK", pn: "Dr HMO" }, Med_name: "SAS Dr. Phyo Zin Maung", Med_phone: "09 456 155 485" },
        "2026-07-14": { SCS: "Dr. Win Min Than", JCS: "Dr. Aye Myint Thet", SAS: "Dr. Linn Bo", AS: "Group 2", AS_short: "Gp 2 (Dr MTK & Dr HMO)", WR: { postop: "Dr NSDT", pn: "Dr HMMM" }, Med_name: "SAS Dr. Phyo Zin Maung", Med_phone: "09 456 155 485" },
        "2026-07-15": { SCS: "Dr. Wah Wah Win Hlaing", JCS: "-", SAS: "Dr. Cho May Mi Htet Naung", AS: "Group 3", AS_short: "Gp 3 (Dr TKW & Dr NLO)", WR: { postop: "Dr TKW", pn: "Dr NLO" }, Med_name: "SAS Dr. Phyo Zin Maung", Med_phone: "09 456 155 485" },
        "2026-07-16": { SCS: "Dr. Myat Myat Aung", JCS: "-", SAS: "Dr. Nay Aung Oo", AS: "Group 1", AS_short: "Gp 1 (Dr HMMM & Dr NSDT)", WR: { postop: "Dr HMO", pn: "Dr MTK" }, Med_name: "SAS Dr. Phyo Zin Maung", Med_phone: "09 456 155 485" },
        "2026-07-17": { SCS: "Dr. Win Min Than", JCS: "Dr. Darli Nyein Chan", SAS: "Dr. Kay Thi Myo Myint", AS: "Group 2", AS_short: "Gp 2 (Dr MTK & Dr HMO)", WR: { postop: "Dr HMMM", pn: "Dr NSDT" }, Med_name: "SAS Dr. Theint Thinzar Kyaw", Med_phone: "09 443 153 586" },
        "2026-07-18": { SCS: "Dr. Wah Wah Win Hlaing", JCS: "-", SAS: "Dr. Linn Bo", AS: "Group 3", AS_short: "Gp 3 (Dr TKW & Dr NLO)", WR: null, Med_name: "SAS Dr. Theint Thinzar Kyaw", Med_phone: "09 443 153 586" },
        "2026-07-19": { SCS: "Dr. Wah Wah Win Hlaing", JCS: "Dr. Aye Myint Thet", SAS: "Dr. Cho May Mi Htet Naung", AS: "Group 1", AS_short: "Gp 1 (Dr HMMM & Dr NSDT)", WR: null, Med_name: "SAS Dr. Theint Thinzar Kyaw", Med_phone: "09 443 153 586" },
        "2026-07-20": { SCS: "Dr. Win Min Than", JCS: "-", SAS: "Dr. Nay Aung Oo", AS: "Group 2", AS_short: "Gp 2 (Dr MTK & Dr HMO)", WR: { postop: "Dr NSDT", pn: "Dr HMMM" }, Med_name: "SAS Dr. Theint Thinzar Kyaw", Med_phone: "09 443 153 586" },
        "2026-07-21": { SCS: "Dr. Wah Wah Win Hlaing", JCS: "-", SAS: "Dr. Kay Thi Myo Myint", AS: "Group 3", AS_short: "Gp 3 (Dr TKW & Dr NLO)", WR: { postop: "Dr NLO", pn: "Dr TKW" }, Med_name: "SAS Dr. Phyu Sin Aye", Med_phone: "09 254 565 451" },
        "2026-07-22": { SCS: "Dr. Myat Myat Aung", JCS: "Dr. Darli Nyein Chan", SAS: "Dr. Linn Bo", AS: "Group 1", AS_short: "Gp 1 (Dr HMMM & Dr NSDT)", WR: { postop: "Dr MTK", pn: "Dr HMO" }, Med_name: "SAS Dr. Phyu Sin Aye", Med_phone: "09 254 565 451" },
        "2026-07-23": { SCS: "Dr. Win Min Than", JCS: "-", SAS: "Dr. Cho May Mi Htet Naung", AS: "Group 2", AS_short: "Gp 2 (Dr MTK & Dr HMO)", WR: { postop: "Dr HMMM", pn: "Dr NSDT" }, Med_name: "SAS Dr. Phyu Sin Aye", Med_phone: "09 254 565 451" },
        "2026-07-24": { SCS: "Dr. Wah Wah Win Hlaing", JCS: "Dr. Aye Myint Thet", SAS: "Dr. Nay Aung Oo", AS: "Group 3", AS_short: "Gp 3 (Dr TKW & Dr NLO)", WR: { postop: "Dr TKW", pn: "Dr NLO" }, Med_name: "SAS Dr. Phyu Sin Aye", Med_phone: "09 254 565 451" },
        "2026-07-25": { SCS: "Dr. Myat Myat Aung", JCS: "-", SAS: "Dr. Kay Thi Myo Myint", AS: "Group 1", AS_short: "Gp 1 (Dr HMMM & Dr NSDT)", WR: null, Med_name: "SAS Dr. Myo Thwin Thein", Med_phone: "09 264 643 399" },
        "2026-07-26": { SCS: "Dr. Myat Myat Aung", JCS: "-", SAS: "Dr. Linn Bo", AS: "Group 2", AS_short: "Gp 2 (Dr MTK & Dr HMO)", WR: null, Med_name: "SAS Dr. Myo Thwin Thein", Med_phone: "09 264 643 399" },
        "2026-07-27": { SCS: "Dr. Wah Wah Win Hlaing", JCS: "Dr. Darli Nyein Chan", SAS: "Dr. Cho May Mi Htet Naung", AS: "Group 3", AS_short: "Gp 3 (Dr TKW & Dr NLO)", WR: { postop: "Dr NLO", pn: "Dr TKW" }, Med_name: "SAS Dr. Myo Thwin Thein", Med_phone: "09 264 643 399" },
        "2026-07-28": { SCS: "Dr. Myat Myat Aung", JCS: "-", SAS: "Dr. Nay Aung Oo", AS: "Group 1", AS_short: "Gp 1 (Dr HMMM & Dr NSDT)", WR: { postop: "Dr HMO", pn: "Dr MTK" }, Med_name: "SAS Dr. Myo Thwin Thein", Med_phone: "09 264 643 399" },
        "2026-07-29": { SCS: "Dr. Win Min Than", JCS: "Dr. Aye Myint Thet", SAS: "Dr. Kay Thi Myo Myint", AS: "Group 2", AS_short: "Gp 2 (Dr MTK & Dr HMO)", WR: null, Med_name: "SAS Dr. Htet Phyo Kyaw", Med_phone: "09 974 302 664 / 09 681 364 292" },
        "2026-07-30": { SCS: "Dr. Wah Wah Win Hlaing", JCS: "-", SAS: "Dr. Linn Bo", AS: "Group 3", AS_short: "Gp 3 (Dr TKW & Dr NLO)", WR: { postop: "Dr TKW", pn: "Dr NLO" }, Med_name: "SAS Dr. Htet Phyo Kyaw", Med_phone: "09 974 302 664 / 09 681 364 292" },
        "2026-07-31": { SCS: "Dr. Myat Myat Aung", JCS: "-", SAS: "Dr. Cho May Mi Htet Naung", AS: "Group 1", AS_short: "Gp 1 (Dr HMMM & Dr NSDT)", WR: { postop: "Dr MTK", pn: "Dr HMO" }, Med_name: "SAS Dr. Htet Phyo Kyaw", Med_phone: "09 974 302 664 / 09 681 364 292" }
    },
    
    // 3. TEAM MEMBER MAPPINGS
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
    },

    // 4. PUBLIC DIRECTORY
    directory: [
        {
            category: "Senior Consultant Surgeons (SCS)",
            contacts: [ { name: "Dr. Myat Myat Aung" }, { name: "Dr. Wah Wah Win Hlaing" }, { name: "Dr. Win Min Than" } ]
        },
        {
            category: "Junior Consultants (JCS)",
            contacts: [ { name: "Dr. Aye Myint Thet" }, { name: "Dr. Darli Nyein Chan" } ]
        },
        {
            category: "Senior Assistant Surgeons (SAS)",
            contacts: [ { name: "Dr. Linn Bo" }, { name: "Dr. Nay Aung Oo" }, { name: "Dr. Kay Thi Myo Myint" }, { name: "Dr. Cho May Mi Htet Naung" } ]
        },
        {
            category: "Assistant Surgeons (AS Groups)",
            subgroups: [
                { name: "Group 1", contacts: [ {name: "AS Dr. Han Myint Mo Mo", phone: "09261618203"}, {name: "AS Dr. Nang Sanda Htun", phone: "09262779715"} ] },
                { name: "Group 2", contacts: [ {name: "AS Dr. May Thu Khaing", phone: "09971170360"}, {name: "AS Dr. Hlaing Myo Oo", phone: "09894702485"} ] },
                { name: "Group 3", contacts: [ {name: "AS Dr. Thukha Wynn", phone: "09424752640"}, {name: "AS Dr. Nay Linn Oo", phone: "09793519374"} ] }
            ]
        },
        {
            category: "House Surgeon Groups (HO)",
            subgroups: [
                { name: "Group A", contacts: [ {name: "Dr. Myat Min Khant", phone: "09440076868"}, {name: "Dr. Phoo Pyae Pyae Hlaing", phone: "09978144352"}, {name: "Dr. Phu Myat Thwe", phone: "09970743532"} ] },
                { name: "Group B", contacts: [ {name: "Dr. Myo Min Kyaw", phone: "09261463976"}, {name: "Dr. Myat Mon Mon Kyaw", phone: "092130724"}, {name: "Dr. May Thet Paing Kyaw", phone: "09424943829"} ] },
                { name: "Group C", contacts: [ {name: "Dr. Aung Kaung Thant Kyaw", phone: "09660160164"}, {name: "Dr. Dazen Kyaw", phone: "09780920988"}, {name: "Dr. Hsu Mon Kyaw", phone: "09445144704"} ] },
                { name: "Group D", contacts: [ {name: "Dr. Kaung Myat Htal", phone: "09420707474"}, {name: "Dr. Mon Mon Thant", phone: "09789686980"}, {name: "Dr. Mon Mon Theint Kyaw", phone: "09452887045"} ] }
            ]
        }
    ]
};
