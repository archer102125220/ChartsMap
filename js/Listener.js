const Listenter = async () => {
    await SetData(document.querySelector("#FileSelect").value);
    // console.log(Data)
    Data.forEach((value) => {
        var NewOption = document.createElement("option");
        NewOption.text = value.item;
        NewOption.value = value.item;
        document.querySelector("#DataTag").add(NewOption);
    });
    Draw(LableLongLatColor, document.querySelector("#DataTag").value);
}

document.querySelector("#DataTag").addEventListener("change", (e) => {
    Draw(LableLongLatColor, e.target.value);
});
document.querySelector("#FileSelect").addEventListener("change", (e) => {
    document.querySelector("#DataTag").innerHTML = '';
    Listenter();
});
document.querySelector("#tab-1").addEventListener("click", (e) => { ShowCharts(e, 'show-block', 'hidden-block'); });
document.querySelector("#tab-2").addEventListener("click", (e) => { ShowCharts(e, 'show-block', 'hidden-block'); });

const ShowCharts = (e, show, hidden) => {
    console.log(e.target.getAttribute(hidden));
    console.log(e.target.getAttribute(show));
    document.querySelector(e.target.getAttribute(show)).style.display = '';
    e.target.getAttribute(hidden).split(/,/).map((value) => {
        document.querySelector(value).style.display = 'none';
    });
}