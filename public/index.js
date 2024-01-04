window.onload = async () => {
  const res = await fetch('/hello');
  document.getElementById('message').innerText = await res.text();
};
