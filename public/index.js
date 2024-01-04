const socket = new WebSocket(`ws://${location.host}/ws`);

socket.addEventListener("error", (error) => {
  console.error(`websocket error:${error}`);
})

window.onload = () => {
  try {
    const btn = document.getElementById("btn");
    const input = document.getElementById("input");
    const outputs = document.getElementById("outputs");

    if (!btn || !input || !outputs) {
      throw new Error("Required DOM is not found.")
    }

    btn.addEventListener("click", (event) => {
      event.preventDefault();
      if (input.value) {
        socket.send(input.value);
        input.value = "";
      } else {
        alert("メッセージを入力してください");
      }
    });

    socket.addEventListener("message", (event) => {
      const li = document.createElement("li");
      li.textContent = event.data;
      outputs.appendChild(li);
    })

  } catch (error) {
    console.error(error);
  }
};
