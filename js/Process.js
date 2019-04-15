const Draw = (Lable, Selecter) => {
    var Tage = Selecter;
    var SelectData = ProcessData.filter((value) => value.item == Tage);
    var SortData = [], i = 0;
    $.each(SelectData[0], (index, val) => {
        if (index != 'item' && index != "Total" && index != "title") {
            SortData[i] = [];
            SortData[i][0] = index
            SortData[i][1] = val.replace(/\%/, '');
            i++;
        } else if (index == "title") {
            document.querySelector('#Title').innerHTML = val;
        }
    });

    SelectData = Object.values(SelectData[0])
        .map((item, index, arr) => (index != 0 && index != 1 && index != arr.length - 1) ? item : 'NO')
        .filter(item => item != 'NO');
    // TOP3 上色
    const AreasLable = SortData
        .map((sd) => { return { ...sd, 1: Number(sd[1]) } })
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(sd => ARAE_KEY.find(({ title }) => sd[0] === title))
        .map((sd, index) => {
            switch (index) {
                case 0: sd.color = 'rgba(228, 50, 54, .5)'; break;    // 紅
                case 1: sd.color = 'rgba(218, 188, 46, .8)'; break;     // 黃
                case 2: sd.color = 'rgba(148, 255, 100, .5)'; break;   // 綠
                case 3: sd.color = 'rgba(50, 62, 228, 0.5)'; break;   //藍
                case 4: sd.color = 'rgba(228, 50, 204, 0.5)'; break;   //紫色
            }
            return sd;
        });
    // End 上色

    // 各地區標籤
    var ImagesLable = '', j = 0;
    Lable.forEach((val) => {
        ImagesLable += `,
                    {
                        "selectable": true,
                        "label": "${val[0]}",
                        "longitude": ${val[1]},
                        "latitude": ${val[2]},
                        "labelPosition": "${val[3]}",
                        "labelColor": "#fff",
                        "labelRollOverColor": "#fff",
                        "labelFontSize": 20
                    }`;
    });

    while (ImagesLable.indexOf('%sr') > 0) {
        if (j < SelectData.length) {
            //console.log(AreasLable.find(({ title }) => title === SelectData[j]));
            const locationLabel = AreasLable.find(({ title }) => title === SortData[j][0]);
            // ImagesLable = ImagesLable.replace('%sr', locationLabel ? locationLabel.title + ' ' + SelectData[j] : SelectData[j]);
            ImagesLable = ImagesLable.replace('%sr', SelectData[j]);
            j++;
        } else {
            ImagesLable = ImagesLable.replace(/\%sr/, '');
        }
    }

    var Parameter = `{
            "type": "map",
            "pathToImages": "http://www.amcharts.com/lib/3/images/",
            "addClassNames": true,
            "fontSize": 18,
            "color": "#fff",
            "projection": "mercator",
            "backgroundAlpha": 2,
            "backgroundColor": "#424D5c",
            "dataProvider": {
                "map": "taiwanLow",
                "zoomLevel": 1.1,
                "zoomLongitude": 123.7,
                "zoomLatitude": 23.8,
                "getAreasFromMap": true,
                "images": [
                    {
                        "top": 40,
                        "left": 60,
                        "width": 80,
                        "height": 40,
                        "pixelMapperLogo": true,
                        "imageURL": "",
                        "url": ""
                    }${ImagesLable}
                ],
                "areas": ${JSON.stringify(AreasLable)}
            },
            "balloon": {
                "horizontalPadding": 15,
                "borderAlpha": 0,
                "borderThickness": 1,
                "verticalPadding": 15
            },
            "areasSettings": {
                "color": "rgba(97, 133, 111, .5)",
                "outlineColor": "rgba(204 ,234, 247, .5)",
                "rollOverOutlineColor": "rgba(80, 80, 80, .5)",
                "rollOverBrightness": 11,
                "selectedBrightness": 30,
                "selectable": true,
                "unlistedAreasAlpha": 0,
                "unlistedAreasOutlineAlpha": 0
            },
            "imagesSettings": {
                "alpha": 1,
                "color": "rgb(187, 187, 187)",
                "outlineAlpha": 0,
                "rollOverOutlineAlpha": 0,
                "outlineColor": "rgba(80,80,80,1)",
                "rollOverBrightness": 20,
                "selectedBrightness": 20,
                "selectable": true
            },
            "linesSettings": {
                "color": "rgb(187, 187, 187)",
                "selectable": true,
                "rollOverBrightness": 20,
                "selectedBrightness": 20
            },
            "zoomControl": {
                "zoomControlEnabled": true,
                "homeButtonEnabled": true,
                "panControlEnabled": true,
                "left": 50,
                "top": 150,
                "minZoomLevel": 0.15,
                "gridHeight": 150,
                "gridAlpha": 0.4,
                "gridBackgroundAlpha": 0,
                "gridColor": "#fff",
                "draggerAlpha": 1,
                "buttonCornerRadius": 2
            }
        }`;
    AmCharts.makeChart("map", JSON.parse(Parameter));

    ChartsDarw(document.querySelector("#Title").innerHTML, SortData
        .map((sd) => {
            return Object.values({
                0: ChineseCounty
                    .find((CC) => CC[0] == sd[0])[1],
                1: Number(sd[1])
            });
        }), AreasLable.map((al) => {
            
            return Object.values({
                ...al,
                0: ChineseCounty
                    .find((CC) => CC[0] == al.title)[1]
            });
        }), Selecter);
}

// 查表用
const ARAE_KEY = [
    {
        "id": "TW-NWT",
        "title": "New Taipei",
        "color": "rgba(25,210,164,0.8)"
    },
    {
        "id": "TW-HUA",
        "title": "Hualien",
        "color": "rgba(70,187,158,0.8)"
    },
    {
        "id": "TW-TPE",
        "title": "Taipei",
        "color": "rgba(27,255,198,0.8)"
    },
    {
        "id": "TW-TAO",
        "title": "Taoyuan",
        "color": "rgba(33,199,158,0.8)"
    },
    {
        "id": "TW-HSQ",
        "title": "Hsinchu",
        "color": "rgba(59,208,171,0.8)"
    },
    {
        "id": "TW-HSZ",
        "title": "Hsinchu",
        "color": "rgba(30,201,159,0.8)"
    },
    {
        "id": "TW-MIA",
        "title": "Miaoli",
        "color": "rgba(16,184,142,0.8)"
    },
    {
        "id": "TW-ILA",
        "title": "Yilan",
        "color": "rgba(17,146,114,0.8)"
    },
    {
        "id": "TW-TXG",
        "title": "Taichung",
        "color": "rgba(17,146,114,0.8)"
    },
    {
        "id": "TW-CHA",
        "title": "Changhua",
        "color": "rgba(17,146,114,0.8)"
    },
    {
        "id": "TW-YUN",
        "title": "Yunlin",
        "color": "rgba(17,146,114,0.8)"
    },
    {
        "id": "TW-TNN",
        "title": "Tainan",
        "color": "rgba(80,224,188,0.8)"
    },
    {
        "id": "TW-KHH",
        "title": "Kaohsiung",
        "color": "rgba(75,210,176,0.8)"
    },
    {
        "id": "TW-TTT",
        "title": "Taitung",
        "color": "rgba(39,199,160,0.8)"
    }
];