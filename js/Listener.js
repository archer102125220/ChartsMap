const Listenter = async () => {
    await SetData(document.querySelector("#FileSelect").value);
    Data.sort((a, b) => b.Total - a.Total);
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