function getAverageColor(img, callback) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  callback({ r, g, b });
}

function rgbToHex({ r, g, b }) {
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}

function getTextColor(rgb) {
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 186 ? "#000" : "#fff";
}

document.getElementById("siteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const businessName = document.getElementById("businessName").value;
  const heroText = document.getElementById("heroText").value.replace(/\n/g, "<br>");
  const ctaText = document.getElementById("ctaText").value;
  const contactMsg = document.getElementById("contactMsg").value;
  const servicesRaw = document.getElementById("services").value;

  const file = document.getElementById("logoUploader").files[0];
  const img = new Image();
  const reader = new FileReader();

  reader.onload = function (event) {
    img.src = event.target.result;
    img.onload = () => {
      getAverageColor(img, (avg) => {
        const mainColor = rgbToHex(avg);
        const textColor = getTextColor(avg);
        const bgColor = textColor === "#fff" ? "#000" : "#fff";

        const servicesHTML = servicesRaw.split("\n").map(line => {
          const [title, description] = line.split("|").map(str => str.trim());
          return `
          <div class="accordion-item">
            <button class="accordion-header">${title}</button>
            <div class="accordion-content">${description || ""}</div>
          </div>`;
        }).join("\n");

        const htmlOutput = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${businessName}</title>
  <style>
    :root {
      --main-color: ${mainColor};
      --text-color: ${textColor};
      --bg-color: ${bgColor};
    }
    body {
      font-family: Georgia, serif;
      background: var(--bg-color);
      color: var(--text-color);
      margin: 0;
    }
    header {
      background: var(--bg-color);
      color: var(--main-color);
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      font-weight: bold;
    }
    .hero {
      background: url('${img.src}') no-repeat center/cover;
      padding: 4rem 1rem;
      text-align: center;
      color: var(--bg-color);
    }
    .hero h2 {
      font-size: 3rem;
    }
    .quote-btn {
      background: var(--main-color);
      color: var(--text-color);
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      display: inline-block;
      margin-top: 1rem;
    }
    .accordion .accordion-header {
      background: none;
      border: none;
      color: var(--main-color);
      font-size: 1.2rem;
      padding: 1rem 0;
      width: 100%;
      text-align: left;
    }
    .accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
      color: var(--text-color);
    }
    .accordion-header.active + .accordion-content {
      max-height: 300px;
      padding-bottom: 1rem;
    }
    .contact {
      background: var(--main-color);
      color: var(--bg-color);
      padding: 2rem 1rem;
    }
    footer {
      background: var(--main-color);
      color: var(--bg-color);
      text-align: center;
      padding: 1rem;
    }
  </style>
</head>
<body>

  <header>
    <div class="logo">${businessName}</div>
    <div class="menu-toggle">&#9776;</div>
  </header>

  <section class="hero">
    <h2>${heroText}</h2>
    <a href="#contact" class="quote-btn">${ctaText}</a>
  </section>

  <section class="services">
    <h2>Our Services</h2>
    <div class="accordion">${servicesHTML}</div>
  </section>

  <section class="contact" id="contact">
    <h2>Get in touch</h2>
    <p>${contactMsg}</p>
    <form>
      <input type="text" placeholder="Address" required><br>
      <textarea placeholder="Name - Phone - How we can help" required></textarea><br>
      <button type="submit">Send</button>
    </form>
  </section>

  <footer>
    <p>${businessName}</p>
  </footer>

  <script>
    document.querySelectorAll('.accordion-header').forEach(button => {
      button.addEventListener('click', () => {
        const active = button.classList.contains('active');
        document.querySelectorAll('.accordion-header').forEach(btn => {
          btn.classList.remove('active');
          btn.nextElementSibling.style.maxHeight = null;
        });
        if (!active) {
          button.classList.add('active');
          const content = button.nextElementSibling;
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  </script>

</body>
</html>`;

        document.getElementById("output").value = htmlOutput.trim();
      };
    };
  };

  reader.readAsDataURL(file);
});
