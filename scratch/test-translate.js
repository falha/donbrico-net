
async function test() {
  const text = "Hello world";
  const lang = "es";
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data[0][0][0]);
  } catch (e) {
    console.error(e.message);
  }
}
test();
