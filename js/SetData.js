const LableLongLatColor = [
    /*[
        "%sr", 121.6899, 25.1514, "right", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],*/
    [
        "%sr", 121.5835, 25.0855, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],
    [
        "%sr", 121.5677, 24.8942, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],/*
    [
        "%sr NO", 121.6772, 24.4754, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],*/
    [
        "%sr", 121.1943, 24.9841, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],
    /*[
        "%sr", 120.9947, 24.7808, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],*/
    [
        "%sr", 121.2587, 24.6225, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],
    [
        "%sr", 120.911, 24.4871, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],
    [
        "%sr", 120.7694, 24.185, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],
    [
        "%sr", 120.5089, 23.973, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],
    [
        "%sr", 120.3316, 23.73, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],
    [
        "%sr", 120.2672, 23.0952, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],
    [
        "%sr", 120.6706, 23.0403, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],
    [
        "%sr", 121.3874, 23.6834, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],
    [
        "%sr", 121.0201, 22.9076, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],
    /*[
        "%sr NO16", 120.9239, 23.8256, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],*/
    /*[
        "%sr NO17", 120.4516, 23.4910, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],*/
    /*[
        "%sr NO18", 120.6376, 22.5685, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],*/
    /*[
        "%sr NO19", 120.6149, 23.3916, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],*/
    /*[
        "%sr NO20", 119.6685, 23.5817, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],*/
    /*[
        "%sr NO21", 118.3874, 24.4811, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ],*/
    /*[
        "%sr NO22", 119.9874, 26.2811, "inside", "rgba(255,0,156,0.8)", "rgba(255,0,156,0.8)", 20
    ]*/
]
let Data = {};
let ProcessData = [];
const FilesName = [
    ['./jsondata/block1.json', '各地區與長照ABC單位綜合統計'],
    ['./jsondata/block2.json', '各地區長期照護服務統計表'],
    /*['./jsondata/block3.json', '各地區以有資訊系統統計表'],*/
    /*['./jsondata/block4.json', '是否知曉衛福部已建立「長照服務資料交換標準」'],*/
    /*['./jsondata/block5.json', '內部尚未資訊化的主要原因'],*/
    /*['./jsondata/block6.json', '未來願意投入資訊化的主要原因'],*/
    ['./jsondata/block7.json', '未來欲投入之內部資訊系統'],
    /*['./jsondata/block8.json', '未來期望政府系統能提供哪些資訊科技的幫助'],*/
]

const ChineseCounty = [
    ['Taipei','台北'],
    ['New Taipei','新北'],
    ['Taoyuan','桃園'],
    ['Hsinchu','新竹'],
    ['Miaoli','苗栗'],
    ['Taichung','台中'],
    ['Changhua','彰化'],
    ['Yunlin','雲林'],
    ['Tainan','台南'],
    ['Kaohsiung','高雄'],
    ['Hualien','花蓮'],
    ['Taitung','台東']
];
FilesName.forEach((value, index) => {
    let NewOption = document.createElement("option");
    NewOption.text = value[1]
    NewOption.value = index;
    document.querySelector("#FileSelect").add(NewOption);
});
const SetData = async (Files) => {
    Data = await fetch(FilesName[Files][0]).then(response => response.json());
    Data.forEach((value, key) => {
        ProcessData[key] = {};
        $.each(value, (index, val) => {
            ProcessData[key][index] = ((index == 'item' || index == 'Total' || index == 'title') ? val : (Math.round((val / value.Total) * 100)) + '%');
        });
    });
}

