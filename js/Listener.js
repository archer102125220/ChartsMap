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