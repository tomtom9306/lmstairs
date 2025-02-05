(function () {
  // ========================
  // SEO & Meta Tags
  // ========================
  document.title = "LM STAIRS - Exquisite Metal Staircases";

  const metaDescription = document.createElement("meta");
  metaDescription.name = "description";
  metaDescription.content =
    "LM STAIRS to renomowany producent ekskluzywnych schodów metalowych. Oferujemy kompleksowe usługi: pomiary i site survey, design, kalkulacje, wizualizacje, rysunki produkcyjne, produkcję oraz montaż. Nasza siedziba znajduje się w sercu Londynu (skupiamy nasze działania na Londynie oraz okolicach, ale działamy również międzynarodowo).";
  document.head.appendChild(metaDescription);

  const metaKeywords = document.createElement("meta");
  metaKeywords.name = "keywords";
  metaKeywords.content =
    "LM STAIRS, schody metalowe, luksusowe schody, bespoke, design schodów, pomiary, rysunki produkcyjne, montaż schodów, London, Westminster, Camden, Kensington, Islington, City of London";
  document.head.appendChild(metaKeywords);

  const viewport = document.createElement("meta");
  viewport.name = "viewport";
  viewport.content = "width=device-width, initial-scale=1.0";
  document.head.appendChild(viewport);

  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.href = "favicon.ico"; // podmień na własną ścieżkę do favicon
  document.head.appendChild(favicon);

  // Dodanie Font Awesome (ikony)
  const faLink = document.createElement("link");
  faLink.rel = "stylesheet";
  faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css";
  document.head.appendChild(faLink);

  // ========================
  // Global Settings
  // ========================
  let currentLang = "en"; // domyślny język: angielski

  // Nawigacja – FAQ, About, Gallery i Staircase Types są osobnymi stronami
  const navItems = {
    en: {
      home: "Home",
      about: "About",
      services: "Services",
      types: "Staircase Types",
      gallery: "Gallery",
      faq: "FAQ",
      contact: "Contact",
    },
    pl: {
      home: "Strona główna",
      about: "O nas",
      services: "Usługi",
      types: "Rodzaje Schodów",
      gallery: "Galeria",
      faq: "FAQ",
      contact: "Kontakt",
    },
    zh: {
      home: "首页",
      about: "关于我们",
      services: "服务",
      types: "楼梯类型",
      gallery: "图库",
      faq: "常见问题",
      contact: "联系我们",
    },
  };

  // ========================
  // 1. Inject Global CSS
  // ========================
  const style = document.createElement("style");
  style.innerHTML = `
    /* Reset & Global Styles */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { font-size: 16px; line-height: 1.6; }
    body { font-family: 'Source Sans Pro', sans-serif; background: #fff; color: #1c1c1c; }
    h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', serif; font-weight: 700; }
    a { text-decoration: none; color: #1c1c1c; }

    /* Container */
    .container { width: 90%; max-width: 1200px; margin: 0 auto; }

    /* Header */
    header {
      background: #fff;
      border-bottom: 1px solid #e6e6e6;
      padding: 0.5rem 0;
      position: fixed;
      top: 0; left: 0; width: 100%;
      z-index: 1100;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo { margin-left: 20px; }
    .logo img { max-height: 50px; max-width: 120px; }

    /* Navigation */
    nav { display: flex; }
    nav ul { list-style: none; display: flex; gap: 1.5rem; align-items: center; }
    nav ul li a { padding: 0.5rem; transition: color 0.3s ease; }
    nav ul li a:hover { color: #FF7F00; }

    /* Hamburger Menu */
    .hamburger { display: none; flex-direction: column; cursor: pointer; margin-right: 20px; }
    .hamburger span { display: block; width: 25px; height: 3px; margin: 4px; background: #1c1c1c; transition: all 0.3s ease; }
    .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .hamburger.open span:nth-child(2) { opacity: 0; }
    .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

    /* Language Dropdown */
    .lang-dropdown { position: relative; display: inline-block; }
    .lang-dropdown button { background: none; border: none; cursor: pointer; padding: 0.5rem; }
    .lang-dropdown button img { height: 20px; vertical-align: middle; }
    .lang-dropdown ul {
      list-style: none; position: absolute; top: 100%; right: 0;
      background: #fff; border: 1px solid #e6e6e6;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      display: none; margin: 0; padding: 0; width: 120px; z-index: 1200;
    }
    .lang-dropdown ul li { padding: 0.5rem; cursor: pointer; }
    .lang-dropdown ul li:hover { background: #f8f8f8; }
    .lang-dropdown.active ul { display: block; }

    /* Overlay (dla mobilnego menu) */
    .overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); opacity: 0; visibility: hidden;
      transition: opacity 0.3s ease; z-index: 900;
    }
    .overlay.active { opacity: 1; visibility: visible; }

    /* Karuzela – główna strona */
    .hero-carousel { position: relative; overflow: hidden; height: 500px; }
    .carousel { display: flex; transition: transform 0.5s ease-in-out; height: 100%; }
    .carousel-slide { min-width: 100%; position: relative; }
    .carousel-slide img { width: 100%; height: 500px; object-fit: cover; display: block; }
    .hero-caption {
      position: absolute; bottom: 20px; left: 50%;
      transform: translateX(-50%); background: rgba(0, 0, 0, 0.6);
      color: #fff; padding: 10px 20px; font-size: 2rem; border-radius: 5px;
    }
    .carousel-nav {
      position: absolute; top: 50%; width: 100%;
      display: flex; justify-content: space-between; transform: translateY(-50%);
      pointer-events: none;
    }
    .carousel-nav button {
      background: rgba(0,0,0,0.5); border: none; color: #fff;
      font-size: 2rem; cursor: pointer; pointer-events: all; padding: 0.5rem 1rem;
    }

    /* Services Section */
    .services { background: #f0f0f0; padding: 2rem 0; }
    .services .service-item {
      text-align: left; padding: 1rem; flex: 1; min-width: 220px;
    }
    .services .service-item i {
      font-size: 2.5rem; color: #FF7F00; margin-bottom: 0.5rem;
    }
    .services .service-item h3 { margin-bottom: 0.5rem; }
    .services .service-item p { text-align: left; margin: 0.5rem 0; }

    /* Staircase Types Section – CSS Grid */
    .staircase-types { padding: 2rem 0; }
    .staircase-types .types-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
    }
    @media (max-width: 1024px) { .staircase-types .types-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) { .staircase-types .types-grid { grid-template-columns: 1fr; } }
    .staircase-types .type-item {
      text-align: center; padding: 1rem; cursor: pointer; transition: transform 0.3s;
      display: block; border: 1px solid transparent;
    }
    .staircase-types .type-item:hover { transform: scale(1.03); border-color: #FF7F00; }
    .staircase-types .type-item img {
      width: 100%; height: 200px; object-fit: cover; border: 1px solid #e6e6e6; margin-bottom: 0.5rem;
    }
    .staircase-types p { text-align: left; margin-bottom: 1rem; }

    /* Gallery Section – CSS Grid */
    .gallery {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem; padding: 2rem 0;
    }
    .gallery-item { height: 200px; overflow: hidden; }
    .gallery-item img {
      width: 100%; height: 100%; object-fit: cover; display: block; border: 1px solid #e6e6e6;
    }

    /* Lightbox Modal */
    #lightbox {
      display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.8); justify-content: center; align-items: center; z-index: 1200;
    }
    #lightbox img { max-width: 90%; max-height: 90%; }
    #lightbox-close {
      position: absolute; top: 20px; right: 30px; font-size: 40px; color: #fff; cursor: pointer;
    }

    /* FAQ Section – dodatkowy padding */
    .faq { padding-top: 20px; }

    /* Contact Section */
    .contact-info { text-align: center; padding: 2rem 0; }
    .contact-info p { margin: 0.5rem 0; }
    .contact-info a { color: #FF7F00; font-weight: 600; }

    /* About Section */
    .about { padding: 2rem 0; }
    .about p { margin-bottom: 1rem; }
    .about img { width: 100%; height: auto; object-fit: contain; }

    /* Footer */
    footer {
      background: #fff; border-top: 1px solid #e6e6e6; text-align: center;
      padding: 1.5rem 0; font-size: 0.9rem;
    }
    footer .company-info { margin-top: 0.5rem; font-size: 0.8rem; }

    /* Main content – mniejszy margines, treść zaczyna się tuż pod headerem */
    #main-content { margin-top: 40px; }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .hamburger { display: flex; }
      nav {
        display: none; width: 100%; background: #fff; position: absolute; top: 70px; left: 0;
        border-top: 1px solid #e6e6e6; z-index: 1000; box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
      nav.active { display: block; }
      nav ul { flex-direction: column; text-align: center; padding: 1rem 0; }
      nav ul li { margin: 1rem 0; }
      .services, .staircase-types, .gallery { padding: 1rem 0; }
      .carousel-slide img { height: 300px; }
      .hero-caption { font-size: 1.5rem; }
    }
  `;
  document.head.appendChild(style);

  // ========================
  // 2. Helper Functions & CSV Data for Gallery (20 images)
  // ========================
  const csvData = (function(){
    let data = "src,alt\n";
    for (let i = 1; i <= 20; i++) {
      data += i + ".png,Exquisite Metal Staircase " + i + "\n";
    }
    return data;
  })();

  function parseCSV(csv) {
    const lines = csv.trim().split("\n");
    const result = [];
    const headers = lines[0].split(",").map(header => header.trim());
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",").map(item => item.trim());
      headers.forEach((header, index) => { obj[header] = currentLine[index]; });
      result.push(obj);
    }
    return result;
  }

  function generateGalleryHTML(lang) {
    const images = parseCSV(csvData);
    let headerText = (lang === "pl") ? "Galeria" : (lang === "zh") ? "图库" : "Gallery";
    let galleryHTML = `<section id="gallery"><div class="container"><h2>${headerText}</h2><div class="gallery">`;
    images.forEach(image => {
      galleryHTML += `<div class="gallery-item">
        <img class="lazy" src="staircase0.jpg" data-src="${image.src}" alt="${image.alt}" loading="lazy">
      </div>`;
    });
    galleryHTML += `</div></div></section>`;
    return galleryHTML;
  }

  // ========================
  // 3. FAQ Content – Professional Questions & Answers
  // ========================
  function generateFAQContentEn() {
    const faqs = [
      {
        question: "What materials are used in LM STAIRS' metal staircases?",
        answer: "Our staircases are crafted using high-quality, durable metals such as stainless steel, aluminum, and custom alloys, ensuring longevity and a sleek, modern appearance."
      },
      {
        question: "How longg does the fabrication process take for a custom staircase?",
        answer: "Typically, our fabrication process takes between 4 to 6 weeks from final design approval to installation, depending on the complexity and customization required."
      },
      {
        question: "Which areas do you serve?",
        answer: "We primarily focus our activities on London and its surrounding areas (including Westminster, Camden, Kensington, Islington, and the City of London), but we also operate internationally, serving clients around the globe."
      },
      {
        question: "Do you offer customization options for your staircases?",
        answer: "Yes, all of our staircases are bespoke. We work closely with clients to tailor designs that meet their specific aesthetic and functional requirements."
      },
      {
        question: "What design software do you use in your staircase projects?",
        answer: "We utilize advanced 3D CAD software to create detailed models and fabrication drawings, ensuring precision and clarity in every project."
      },
      {
        question: "Can you provide references or case studies of previous projects?",
        answer: "Absolutely. We have a comprehensive portfolio of completed projects and can provide references from satisfied clients upon request."
      },
      {
        question: "What quality control measures are in place during production?",
        answer: "Our production process includes rigorous quality control checks at every stage, ensuring that every staircase meets the highest standards of durability and design."
      },
      {
        question: "How do you ensure the safety and durability of your staircases?",
        answer: "Our designs adhere to international safety standards and building codes, and we use premium materials along with advanced fabrication techniques to ensure long-lasting performance."
      },
      {
        question: "What is your process for handling design changes during production?",
        answer: "We maintain open communication with our clients; any requested changes are thoroughly evaluated and incorporated into the project with minimal disruption to the timeline."
      },
      {
        question: "Are your staircases compliant with local building codes and regulations?",
        answer: "Yes, all of our designs meet or exceed local building codes and regulations, ensuring both safety and compliance."
      },
      {
        question: "How do you manage international orders?",
        answer: "We have a dedicated international sales team that coordinates logistics, shipping, and installation to provide a seamless experience for global clients."
      },
      {
        question: "What kind of maintenance do your staircases require?",
        answer: "Our staircases are designed to be low-maintenance; routine cleaning and periodic inspections are generally sufficient to keep them in excellent condition."
      },
      {
        question: "Can you install staircases in both commercial and residential settings?",
        answer: "Yes, our solutions are versatile and can be fully customized for both commercial and residential projects."
      },
      {
        question: "Do you provide on-site consultations and measurements?",
        answer: "Yes, our experts are available for on-site consultations and precise measurements to ensure every project is perfectly tailored to the space."
      },
      {
        question: "How do you integrate modern design trends into your staircases?",
        answer: "We continuously update our design portfolio by incorporating the latest trends and innovative techniques, ensuring our staircases remain both timeless and contemporary."
      },
      {
        question: "What types of finishes are available for your metal staircases?",
        answer: "We offer a wide range of finishes including polished, brushed, and custom color options to complement any interior or exterior design."
      },
      {
        question: "How do you address noise and vibration in staircase installations?",
        answer: "We employ specialized materials and engineering techniques to minimize noise and vibration, ensuring a quiet and stable installation."
      },
      {
        question: "Can you design staircases for confined or unusual spaces?",
        answer: "Absolutely. Our bespoke solutions are ideal for challenging spaces, and we work closely with clients to maximize functionality without compromising on design."
      },
      {
        question: "What is the typical lead time from design to installation?",
        answer: "Generally, lead times range from 4 to 6 weeks, although highly complex or customized projects may require additional time."
      },
      {
        question: "Do you offer financing or payment plans for large projects?",
        answer: "Yes, we understand the scale of investment required for custom projects and offer flexible financing options to accommodate our clients' needs."
      },
      {
        question: "How do you ensure that your designs meet client specifications?",
        answer: "We collaborate closely with our clients throughout the process—from the initial concept to the final installation—ensuring their vision is fully realized."
      },
      {
        question: "What certifications or industry standards do your products meet?",
        answer: "Our products comply with numerous industry standards and certifications, including ISO and local building codes, guaranteeing both quality and safety."
      },
      {
        question: "How do you incorporate energy efficiency in your staircase designs?",
        answer: "Our designs emphasize not only aesthetics and durability but also energy efficiency, utilizing innovative material choices and production techniques."
      },
      {
        question: "What role does technology play in your production process?",
        answer: "Technology is at the core of our operations—using 3D laser measurements, advanced CAD modeling, and state-of-the-art fabrication machinery to ensure precision and quality."
      },
      {
        question: "How do you handle project delays or unforeseen issues?",
        answer: "We maintain a proactive approach, providing regular updates and implementing contingency plans to address any challenges as they arise."
      },
      {
        question: "What is the warranty policy for your metal staircases?",
        answer: "We offer comprehensive warranties covering both materials and workmanship, providing peace of mind for our clients."
      },
      {
        question: "Can you retrofit or upgrade existing staircase structures?",
        answer: "Yes, we provide services to retrofit or upgrade existing staircases, enhancing both functionality and design."
      },
      {
        question: "How do you ensure that your designs are both functional and aesthetically pleasing?",
        answer: "Our design process strikes a perfect balance between form and function, ensuring every staircase is both beautiful and practical."
      },
      {
        question: "What are the benefits of choosing a bespoke metal staircase over a standard solution?",
        answer: "Bespoke staircases offer tailored design, superior quality, and complete customization to match any interior or exterior environment, making them a unique statement piece."
      },
      {
        question: "How do you manage the environmental impact of your production process?",
        answer: "We are committed to sustainability by using eco-friendly practices, reducing waste, and optimizing energy consumption throughout our production process."
      },
      {
        question: "Do you collaborate with architects and interior designers?",
        answer: "Yes, we work closely with architects, interior designers, and other professionals to develop integrated solutions that enhance any space."
      },
      {
        question: "How is the cost of a custom staircase determined?",
        answer: "Costs depend on design complexity, materials, and the scope of the project. We provide detailed quotations after thorough consultations and measurements."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods including bank transfers, credit cards, and secure online payment options."
      },
      {
        question: "Are there any financing options available?",
        answer: "Yes, we offer flexible financing plans to help our clients manage the investment required for custom staircase projects."
      },
      {
        question: "How do you ensure consistency in quality across projects?",
        answer: "Our standardized production processes, rigorous quality control measures, and experienced teams ensure consistent, high-quality outcomes on every project."
      },
      {
        question: "Can you provide 3D visualizations or mock-ups before fabrication?",
        answer: "Absolutely. We offer detailed 3D visualizations and mock-ups, allowing clients to review and refine the design before production begins."
      },
      {
        question: "What factors influence the final design of a staircase?",
        answer: "Key factors include available space, desired aesthetics, structural requirements, and client specifications. We take all of these into account to create a harmonious design."
      },
      {
        question: "How do you ensure the durability of your products in various climates?",
        answer: "We select premium, corrosion-resistant materials and employ advanced finishing techniques to ensure our staircases withstand diverse environmental conditions."
      },
      {
        question: "What sets LM STAIRS apart from other staircase manufacturers?",
        answer: "Our unique blend of traditional craftsmanship and cutting-edge technology, along with bespoke design options and exceptional customer service, distinguishes us as an industry leader."
      },
      {
        question: "How can clients initiate a project or request a quote?",
        answer: "Clients can contact us via email, phone, or our online form. Our team will promptly arrange a consultation to discuss project requirements and provide a detailed quotation."
      }
    ];

    let faqHTML = `<section class="faq"><div class="container"><h2>Frequently Asked Questions</h2>`;
    faqHTML += faqs.map(faq => `<div class="faq-item"><h4>${faq.question}</h4><p>${faq.answer}</p></div>`).join("");
    faqHTML += `</div></section>`;
    return faqHTML;
  }

  function generateFAQContentPl() {
    const faqs = [
      {
        question: "Jakie materiały są wykorzystywane przy produkcji schodów LM STAIRS?",
        answer: "Nasze schody wykonujemy z najwyższej jakości metali, takich jak stal nierdzewna, aluminium oraz specjalne stopy, co gwarantuje trwałość i nowoczesny wygląd."
      },
      {
        question: "Ile czasu trwa proces produkcji schodów na zamówienie?",
        answer: "Proces produkcji zazwyczaj trwa od 4 do 6 tygodni od zatwierdzenia projektu do instalacji, w zależności od stopnia skomplikowania i indywidualnych wymagań."
      },
      {
        question: "Na jakie obszary kierujecie swoje usługi?",
        answer: "Skupiamy nasze działania na Londynie oraz okolicach (m.in. Westminster, Camden, Kensington, Islington oraz City of London), ale działamy także międzynarodowo, obsługując klientów z całego świata."
      },
      {
        question: "Czy oferujecie opcje personalizacji schodów?",
        answer: "Tak, wszystkie nasze schody są wykonywane na zamówienie. Ściśle współpracujemy z klientami, aby dostosować projekt do ich specyficznych oczekiwań estetycznych i funkcjonalnych."
      },
      {
        question: "Jakie oprogramowanie wykorzystujecie przy projektowaniu schodów?",
        answer: "Korzystamy z zaawansowanego oprogramowania 3D CAD, które umożliwia tworzenie precyzyjnych modeli oraz szczegółowych rysunków produkcyjnych."
      },
      {
        question: "Czy możecie przedstawić referencje lub studia przypadków z realizacji?",
        answer: "Oczywiście. Posiadamy bogate portfolio zrealizowanych projektów i chętnie udostępniamy referencje od naszych zadowolonych klientów."
      },
      {
        question: "Jakie procedury kontroli jakości stosujecie podczas produkcji?",
        answer: "Nasze procesy produkcyjne obejmują rygorystyczne kontrole jakości na każdym etapie, co gwarantuje, że każde schody spełniają najwyższe standardy."
      },
      {
        question: "W jaki sposób zapewniacie bezpieczeństwo i trwałość schodów?",
        answer: "Nasze projekty są zgodne z międzynarodowymi normami bezpieczeństwa oraz lokalnymi przepisami, a do produkcji wykorzystujemy materiały najwyższej jakości i nowoczesne technologie."
      },
      {
        question: "Jak przebiega proces wprowadzania zmian w projekcie podczas produkcji?",
        answer: "Utrzymujemy stały kontakt z klientem. Wszelkie zmiany są dokładnie analizowane i wdrażane, aby nie zakłócały harmonogramu realizacji."
      },
      {
        question: "Czy wasze schody spełniają lokalne przepisy budowlane?",
        answer: "Tak, wszystkie nasze projekty spełniają lub przewyższają wymagania lokalnych przepisów budowlanych, gwarantując bezpieczeństwo użytkowania."
      },
      {
        question: "Jak obsługujecie zamówienia międzynarodowe?",
        answer: "Posiadamy dedykowany zespół ds. sprzedaży międzynarodowej, który koordynuje logistykę, wysyłkę i instalację, zapewniając kompleksową obsługę klientów z całego świata."
      },
      {
        question: "Jakie wymagania konserwacyjne mają wasze schody?",
        answer: "Nasze schody są zaprojektowane z myślą o niskim koszcie utrzymania – wystarczą regularne czyszczenie i okresowe przeglądy."
      },
      {
        question: "Czy montujecie schody w obiektach komercyjnych i mieszkaniowych?",
        answer: "Tak, nasze rozwiązania są uniwersalne i możemy dostosować projekty zarówno do potrzeb obiektów komercyjnych, jak i mieszkaniowych."
      },
      {
        question: "Czy oferujecie konsultacje na miejscu i pomiary?",
        answer: "Tak, nasi specjaliści są dostępni do przeprowadzenia konsultacji na miejscu oraz dokładnych pomiarów, co pozwala nam precyzyjnie dopasować projekt do przestrzeni."
      },
      {
        question: "Jak wprowadzacie nowoczesne trendy w swoich projektach?",
        answer: "Regularnie aktualizujemy nasze portfolio, integrując najnowsze trendy i innowacyjne rozwiązania, aby nasze schody były zarówno ponadczasowe, jak i nowoczesne."
      },
      {
        question: "Jakie rodzaje wykończeń oferujecie do schodów metalowych?",
        answer: "Oferujemy szeroką gamę wykończeń, w tym polerowane, szczotkowane oraz niestandardowe kolory, które doskonale komponują się z każdym stylem wnętrza lub elewacji."
      },
      {
        question: "W jaki sposób redukujecie hałas i wibracje w instalacjach schodowych?",
        answer: "Stosujemy specjalistyczne materiały oraz techniki inżynieryjne, które minimalizują hałas i wibracje, zapewniając komfort użytkowania."
      },
      {
        question: "Czy projektujecie schody do nietypowych lub ograniczonych przestrzeni?",
        answer: "Tak, nasze rozwiązania są idealne do trudnych przestrzeni. Dostosowujemy projekt, aby maksymalnie wykorzystać dostępną przestrzeń bez utraty funkcjonalności."
      },
      {
        question: "Jaki jest typowy czas realizacji od projektu do montażu?",
        answer: "Czas realizacji zazwyczaj wynosi od 4 do 6 tygodni, jednak bardziej złożone projekty mogą wymagać dodatkowego czasu."
      },
      {
        question: "Czy oferujecie opcje finansowania lub rozłożenia płatności?",
        answer: "Tak, oferujemy elastyczne opcje finansowania, które umożliwiają rozłożenie kosztów inwestycji na dogodne raty."
      },
      {
        question: "Jak zapewniacie, że projekt spełnia oczekiwania klienta?",
        answer: "Współpracujemy z klientem na każdym etapie – od koncepcji po finalną instalację, aby mieć pewność, że finalny produkt odpowiada jego wizji."
      },
      {
        question: "Jakie certyfikaty posiadają wasze produkty?",
        answer: "Nasze schody spełniają liczne normy i posiadają certyfikaty, takie jak ISO oraz wymagania lokalnych przepisów budowlanych, co gwarantuje ich wysoką jakość i bezpieczeństwo."
      },
      {
        question: "Jak uwzględniacie efektywność energetyczną w projektach?",
        answer: "Projektujemy nasze schody z myślą o efektywności energetycznej, stosując nowoczesne technologie i materiały, które pozwalają na oszczędność energii podczas produkcji i eksploatacji."
      },
      {
        question: "Jaką rolę odgrywa technologia w waszej produkcji?",
        answer: "Technologia jest kluczowym elementem naszej działalności – wykorzystujemy najnowsze narzędzia, takie jak 3D laserowe pomiary i zaawansowane maszyny produkcyjne, aby zagwarantować precyzję i jakość."
      },
      {
        question: "Jak radzicie sobie z opóźnieniami w realizacji projektu?",
        answer: "Dzięki stałej komunikacji i planom awaryjnym, szybko reagujemy na wszelkie opóźnienia, minimalizując wpływ na harmonogram realizacji."
      },
      {
        question: "Jaka jest polityka gwarancyjna waszych schodów?",
        answer: "Oferujemy kompleksowe gwarancje obejmujące zarówno materiały, jak i wykonanie, co daje naszym klientom pełne poczucie bezpieczeństwa."
      },
      {
        question: "Czy modernizujecie istniejące struktury schodowe?",
        answer: "Tak, oferujemy usługi modernizacji i adaptacji schodów, aby poprawić ich funkcjonalność oraz estetykę, dostosowując je do nowych wymagań."
      },
      {
        question: "Jak łączą się estetyka i funkcjonalność w waszych projektach?",
        answer: "Nasze projekty łączą artystyczny design z praktycznymi rozwiązaniami, tworząc schody, które są zarówno piękne, jak i użyteczne."
      },
      {
        question: "Jakie korzyści niesie ze sobą wybór schodów na zamówienie?",
        answer: "Schody na zamówienie to gwarancja unikalnego designu, wyższej jakości wykonania oraz pełnej personalizacji, co pozwala na stworzenie rozwiązania idealnie dopasowanego do przestrzeni klienta."
      },
      {
        question: "Jak dbacie o środowisko w procesie produkcji?",
        answer: "Stosujemy zrównoważone praktyki produkcyjne, minimalizując odpady i zużycie energii, co pozwala nam działać w sposób przyjazny dla środowiska."
      },
      {
        question: "Czy współpracujecie z architektami i projektantami wnętrz?",
        answer: "Tak, ściśle współpracujemy z architektami, projektantami wnętrz oraz innymi specjalistami, aby stworzyć spójne rozwiązania projektowe."
      },
      {
        question: "Jak ustalana jest cena schodów na zamówienie?",
        answer: "Cena zależy od złożoności projektu, użytych materiałów oraz zakresu prac. Po przeprowadzeniu szczegółowych pomiarów przygotowujemy indywidualną wycenę."
      },
      {
        question: "Jakie metody płatności akceptujecie?",
        answer: "Akceptujemy przelewy bankowe, karty kredytowe oraz bezpieczne płatności online, dostosowując się do preferencji klienta."
      },
      {
        question: "Czy oferujecie rozłożenie płatności dla większych projektów?",
        answer: "Tak, oferujemy elastyczne opcje finansowania, które pozwalają na rozłożenie kosztów na dogodne raty."
      },
      {
        question: "Jak zapewniacie jednolitość jakości w różnych projektach?",
        answer: "Dzięki standaryzowanym procedurom produkcyjnym oraz rygorystycznej kontroli jakości, nasze produkty są spójne i spełniają najwyższe standardy."
      },
      {
        question: "Czy oferujecie wizualizacje 3D przed rozpoczęciem produkcji?",
        answer: "Tak, przygotowujemy szczegółowe wizualizacje 3D, które umożliwiają klientom dokładne zapoznanie się z projektem i wprowadzenie ewentualnych korekt."
      },
      {
        question: "Jakie czynniki wpływają na ostateczny projekt schodów?",
        answer: "Ostateczny projekt zależy od dostępnej przestrzeni, preferencji estetycznych, wymagań konstrukcyjnych oraz specyfikacji klienta, co pozwala nam stworzyć spójne i funkcjonalne rozwiązanie."
      },
      {
        question: "Jak zapewniacie trwałość produktów w różnych warunkach klimatycznych?",
        answer: "Wybieramy materiały odporne na korozję i stosujemy zaawansowane techniki wykończenia, aby nasze schody były trwałe niezależnie od warunków atmosferycznych."
      },
      {
        question: "Co wyróżnia LM STAIRS na tle konkurencji?",
        answer: "Nasze unikalne połączenie tradycyjnego rzemiosła z nowoczesnymi technologiami, indywidualne podejście do klienta oraz wysoka jakość wykonania wyróżniają nas jako lidera w branży."
      },
      {
        question: "Jak mogę rozpocząć współpracę lub uzyskać wycenę projektu?",
        answer: "Wystarczy skontaktować się z nami za pośrednictwem e-maila, telefonu lub formularza online, a nasz zespół niezwłocznie umówi się na konsultację i przygotuje szczegółową wycenę."
      }
    ];

    let faqHTML = `<section class="faq"><div class="container"><h2>Frequently Asked Questions</h2>`;
    faqHTML += faqs.map(faq => `<div class="faq-item"><h4>${faq.question}</h4><p>${faq.answer}</p></div>`).join("");
    faqHTML += `</div></section>`;
    return faqHTML;
  }

  function generateFAQContentPl() {
    const faqs = [
      {
        question: "Jakie materiały są wykorzystywane przy produkcji schodów LM STAIRS?",
        answer: "Nasze schody wykonujemy z najwyższej jakości metali, takich jak stal nierdzewna, aluminium oraz specjalne stopy, co gwarantuje trwałość i nowoczesny wygląd."
      },
      {
        question: "Ile czasu trwa proces produkcji schodów na zamówienie?",
        answer: "Proces produkcji zazwyczaj trwa od 4 do 6 tygodni od zatwierdzenia projektu do instalacji, w zależności od stopnia skomplikowania i indywidualnych wymagań."
      },
      {
        question: "Na jakie obszary kierujecie swoje usługi?",
        answer: "Skupiamy nasze działania na Londynie oraz okolicach (m.in. Westminster, Camden, Kensington, Islington oraz City of London), ale działamy także międzynarodowo, obsługując klientów z całego świata."
      },
      {
        question: "Czy oferujecie opcje personalizacji schodów?",
        answer: "Tak, wszystkie nasze schody są wykonywane na zamówienie. Współpracujemy z klientami, aby dostosować projekt do ich specyficznych oczekiwań zarówno pod względem estetycznym, jak i funkcjonalnym."
      },
      {
        question: "Jakie oprogramowanie wykorzystujecie przy projektowaniu schodów?",
        answer: "Korzystamy z zaawansowanego oprogramowania 3D CAD, które umożliwia tworzenie precyzyjnych modeli oraz szczegółowych rysunków produkcyjnych."
      },
      {
        question: "Czy możecie przedstawić referencje lub studia przypadków z realizacji?",
        answer: "Oczywiście. Posiadamy bogate portfolio zrealizowanych projektów i chętnie udostępnimy referencje od naszych zadowolonych klientów."
      },
      {
        question: "Jakie procedury kontroli jakości stosujecie podczas produkcji?",
        answer: "Nasze procesy produkcyjne obejmują rygorystyczną kontrolę jakości na każdym etapie, co gwarantuje, że każde schody spełniają najwyższe standardy wytrzymałości i designu."
      },
      {
        question: "Jak zapewniacie bezpieczeństwo i trwałość schodów?",
        answer: "Nasze projekty są zgodne z międzynarodowymi normami bezpieczeństwa i lokalnymi przepisami budowlanymi, a do produkcji wykorzystujemy materiały najwyższej jakości oraz nowoczesne technologie."
      },
      {
        question: "Jak przebiega proces wprowadzania zmian w projekcie podczas produkcji?",
        answer: "Utrzymujemy stały kontakt z klientem; wszelkie zmiany są dokładnie analizowane i wdrażane, aby nie zakłócały harmonogramu realizacji."
      },
      {
        question: "Czy wasze schody są zgodne z lokalnymi przepisami budowlanymi?",
        answer: "Tak, wszystkie nasze projekty spełniają lub przewyższają wymagania lokalnych przepisów budowlanych, co gwarantuje bezpieczeństwo użytkowania."
      },
      {
        question: "Jak obsługujecie zamówienia międzynarodowe?",
        answer: "Posiadamy dedykowany zespół ds. sprzedaży międzynarodowej, który koordynuje logistykę, wysyłkę oraz instalację, zapewniając kompleksową obsługę klientów z całego świata."
      },
      {
        question: "Jakie wymagania konserwacyjne mają wasze schody?",
        answer: "Nasze schody są zaprojektowane z myślą o niskim koszcie utrzymania – wystarczą regularne czyszczenie i okresowe przeglądy."
      },
      {
        question: "Czy montujecie schody w obiektach komercyjnych i mieszkaniowych?",
        answer: "Tak, nasze rozwiązania są uniwersalne i mogą być dostosowane zarówno do obiektów komercyjnych, jak i mieszkaniowych."
      },
      {
        question: "Czy oferujecie konsultacje na miejscu i pomiary?",
        answer: "Tak, nasi specjaliści przeprowadzają konsultacje na miejscu oraz dokładne pomiary, aby każdy projekt był idealnie dopasowany do przestrzeni klienta."
      },
      {
        question: "Jak wprowadzacie nowoczesne trendy w swoich projektach?",
        answer: "Regularnie aktualizujemy nasze portfolio, integrując najnowsze trendy i innowacyjne rozwiązania, co pozwala nam tworzyć schody, które są zarówno ponadczasowe, jak i nowoczesne."
      },
      {
        question: "Jakie rodzaje wykończeń oferujecie do schodów metalowych?",
        answer: "Oferujemy szeroką gamę wykończeń, w tym wykończenia polerowane, szczotkowane oraz niestandardowe kolory, które doskonale komponują się z każdym stylem wnętrza lub elewacji."
      },
      {
        question: "W jaki sposób redukujecie hałas i wibracje w instalacjach schodowych?",
        answer: "Stosujemy specjalistyczne materiały oraz techniki inżynieryjne, które minimalizują hałas i wibracje, zapewniając komfort użytkowania."
      },
      {
        question: "Czy projektujecie schody do nietypowych lub ograniczonych przestrzeni?",
        answer: "Tak, nasze rozwiązania są idealne do trudnych przestrzeni – dostosowujemy projekt, aby maksymalnie wykorzystać dostępną przestrzeń bez utraty funkcjonalności."
      },
      {
        question: "Jaki jest typowy czas realizacji od projektu do montażu?",
        answer: "Czas realizacji zazwyczaj wynosi od 4 do 6 tygodni, choć bardziej złożone projekty mogą wymagać dodatkowego czasu."
      },
      {
        question: "Czy oferujecie opcje finansowania lub rozłożenia płatności?",
        answer: "Tak, oferujemy elastyczne opcje finansowania, które umożliwiają rozłożenie kosztów inwestycji na dogodne raty."
      },
      {
        question: "Jak zapewniacie, że projekt spełnia oczekiwania klienta?",
        answer: "Współpracujemy ściśle z klientem na każdym etapie, od koncepcji po finalną instalację, aby upewnić się, że finalny produkt odzwierciedla jego wizję."
      },
      {
        question: "Jakie certyfikaty i standardy posiadają wasze produkty?",
        answer: "Nasze schody są zgodne z licznymi normami przemysłowymi, w tym ISO oraz lokalnymi przepisami budowlanymi, co gwarantuje najwyższą jakość i bezpieczeństwo."
      },
      {
        question: "Jak uwzględniacie efektywność energetyczną w projektach schodów?",
        answer: "Projektujemy nasze schody z myślą o efektywności energetycznej, stosując nowoczesne materiały i technologie, które przyczyniają się do oszczędności energii."
      },
      {
        question: "Jaką rolę odgrywa technologia w waszym procesie produkcyjnym?",
        answer: "Technologia stanowi fundament naszej produkcji – od precyzyjnych pomiarów 3D laserowych po zaawansowane systemy CAD i nowoczesne maszyny produkcyjne, co zapewnia doskonałość każdego projektu."
      },
      {
        question: "Jak radzicie sobie z opóźnieniami lub niespodziewanymi problemami?",
        answer: "Dzięki stałej komunikacji i przygotowanym planom awaryjnym szybko reagujemy na wszelkie opóźnienia, minimalizując ich wpływ na harmonogram projektu."
      },
      {
        question: "Jaka jest polityka gwarancyjna waszych schodów metalowych?",
        answer: "Oferujemy kompleksowe gwarancje obejmujące zarówno użyte materiały, jak i wykonanie, co zapewnia naszym klientom pełne bezpieczeństwo."
      },
      {
        question: "Czy modernizujecie lub adaptujecie istniejące schody?",
        answer: "Tak, oferujemy usługi modernizacji oraz adaptacji schodów, poprawiając ich funkcjonalność i estetykę, dostosowując je do nowych wymagań."
      },
      {
        question: "Jak łączą się estetyka i funkcjonalność w waszych projektach?",
        answer: "Nasze projekty opierają się na równowadze między formą a funkcją, co pozwala nam tworzyć schody, które są zarówno piękne, jak i praktyczne."
      },
      {
        question: "Jakie są korzyści z wyboru schodów na zamówienie?",
        answer: "Schody na zamówienie to gwarancja unikalnego designu, najwyższej jakości wykonania oraz pełnej personalizacji, dzięki czemu idealnie wpisują się w wymagania każdego projektu."
      },
      {
        question: "Jak dbacie o środowisko w procesie produkcji?",
        answer: "Stosujemy zrównoważone praktyki produkcyjne, minimalizując odpady i zużycie energii, co pozwala nam działać przyjaźnie dla środowiska."
      },
      {
        question: "Czy współpracujecie z architektami i projektantami wnętrz?",
        answer: "Tak, współpracujemy ściśle z architektami, projektantami wnętrz i innymi specjalistami, aby tworzyć spójne i funkcjonalne rozwiązania."
      },
      {
        question: "Jak ustalana jest cena schodów na zamówienie?",
        answer: "Koszt zależy od stopnia skomplikowania projektu, użytych materiałów oraz zakresu prac. Po dokładnych pomiarach przygotowujemy indywidualną wycenę."
      },
      {
        question: "Jakie formy płatności akceptujecie?",
        answer: "Akceptujemy przelewy bankowe, karty kredytowe oraz bezpieczne płatności online, dostosowując się do preferencji naszych klientów."
      },
      {
        question: "Czy oferujecie rozłożenie płatności dla większych projektów?",
        answer: "Tak, oferujemy elastyczne opcje finansowania, umożliwiające rozłożenie kosztów na dogodne raty."
      },
      {
        question: "Jak zapewniacie jednolitość jakości w realizowanych projektach?",
        answer: "Dzięki standaryzowanym procedurom produkcyjnym i rygorystycznej kontroli jakości gwarantujemy spójność oraz najwyższą jakość każdego projektu."
      },
      {
        question: "Czy oferujecie wizualizacje 3D przed rozpoczęciem produkcji?",
        answer: "Tak, przygotowujemy szczegółowe wizualizacje 3D, które pozwalają klientom zobaczyć finalny projekt przed rozpoczęciem produkcji i wprowadzić ewentualne korekty."
      },
      {
        question: "Jakie czynniki wpływają na ostateczny projekt schodów?",
        answer: "Ostateczny projekt zależy od dostępnej przestrzeni, preferencji estetycznych, wymagań konstrukcyjnych oraz specyfikacji klienta, co pozwala nam stworzyć harmonijną całość."
      },
      {
        question: "Jak zapewniacie trwałość waszych produktów w różnych warunkach klimatycznych?",
        answer: "Wybieramy materiały odporne na korozję i stosujemy zaawansowane techniki wykończenia, aby nasze schody były trwałe niezależnie od warunków atmosferycznych."
      },
      {
        question: "Co wyróżnia LM STAIRS na tle konkurencji?",
        answer: "Nasze połączenie tradycyjnego rzemiosła z nowoczesnymi technologiami, indywidualne podejście do klienta oraz wysoki standard wykonania sprawiają, że jesteśmy liderem w branży."
      },
      {
        question: "Jak mogę rozpocząć współpracę lub uzyskać wycenę projektu?",
        answer: "Skontaktuj się z nami poprzez e-mail, telefon lub formularz online, a nasz zespół umówi się na konsultację i przygotuje szczegółową wycenę."
      }
    ];

    let faqHTML = `<section class="faq"><div class="container"><h2>FAQ</h2>`;
    faqHTML += faqs.map(faq => `<div class="faq-item"><h4>${faq.question}</h4><p>${faq.answer}</p></div>`).join("");
    faqHTML += `</div></section>`;
    return faqHTML;
  }

  function generateFAQContentZh() {
    // Dla uproszczenia, FAQ w języku chińskim generujemy nadal jako przykładowe pytania.
    let faqItems = "";
    for (let i = 1; i <= 40; i++) {
      if(i === 3) {
        faqItems += `<div class="faq-item"><h4>问题 3: 你们服务哪些地区？</h4><p>我们主要集中在伦敦及其周边地区（包括Westminster, Camden, Kensington, Islington和City of London），但我们也在国际上运营，为全球客户提供服务。</p></div>`;
      } else {
        faqItems += `<div class="faq-item"><h4>问题 ${i}: 示例问题 ${i}？</h4><p>这是针对问题 ${i} 的示例答案。</p></div>`;
      }
    }
    return `<section class="faq"><div class="container"><h2>常见问题</h2>${faqItems}</div></section>`;
  }

  const pageContent = {
    en: {
      home: `
        <section class="hero-carousel">
          <div class="carousel">
            <div class="carousel-slide">
              <img class="lazy" src="staircase0.jpg" data-src="staircase1.jpg" alt="Exquisite Metal Staircase 1" loading="lazy">
            </div>
            <div class="carousel-slide">
              <img class="lazy" src="staircase0.jpg" data-src="staircase2.jpg" alt="Exquisite Metal Staircase 2" loading="lazy">
            </div>
            <div class="carousel-slide">
              <img class="lazy" src="staircase0.jpg" data-src="staircase3.jpg" alt="Exquisite Metal Staircase 3" loading="lazy">
            </div>
          </div>
          <div class="hero-caption">
            Exquisite Metal Staircases
          </div>
          <div class="carousel-nav">
            <button class="carousel-prev">&#10094;</button>
            <button class="carousel-next">&#10095;</button>
          </div>
        </section>
        <section class="services">
          <div class="container">
            <h2>Our Services</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
              <div class="service-item">
                <i class="fas fa-ruler-combined"></i>
                <h3>Site Survey and Measurements</h3>
                <p>
                  We conduct thorough on‑site surveys and measurements using the latest measuring devices and 3D lasers.<br>
                  We manage every phase from initial assessment to final reporting.
                </p>
              </div>
              <div class="service-item">
                <i class="fas fa-pencil-ruler"></i>
                <h3>Design and Calculations</h3>
                <p>
                  Our designers use 3D CAD and prepare a complete set of drawings for project approval before production.<br>
                  Every detail is planned comprehensively.
                </p>
              </div>
              <div class="service-item">
                <i class="fas fa-drafting-compass"></i>
                <h3>Fabrication Drawings</h3>
                <p>
                  Detailed technical drawings to ensure flawless production.<br>
                  We cover every aspect from concept to manufacturing.
                </p>
              </div>
              <div class="service-item">
                <i class="fas fa-hammer"></i>
                <h3>Fabrication and Installation</h3>
                <p>
                  Expert fabrication and seamless installation by our skilled teams.<br>
                  We handle the complete process from production to final installation.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section class="staircase-types">
          <div class="container">
            <h2>Our Staircase Types</h2>
            <p style="font-size: 1rem; color: #555; margin-bottom: 1rem;">
              The examples below represent some of the staircase types we produce. With our extensive experience, we also create custom, non-standard designs tailored to your unique requirements.
            </p>
            <div class="types-grid">
              <a class="type-item" href="#staircase-spiralne">
                <img class="lazy" src="staircase0.jpg" data-src="staircase1.jpg" alt="Spiral Staircase" loading="lazy">
                <p>Spiral Staircase</p>
              </a>
              <a class="type-item" href="#staircase-zaokraglone">
                <img class="lazy" src="staircase0.jpg" data-src="staircase2.jpg" alt="Curved Staircase" loading="lazy">
                <p>Curved Staircase</p>
              </a>
              <a class="type-item" href="#staircase-central">
                <img class="lazy" src="staircase0.jpg" data-src="staircase3.jpg" alt="Single Central Stringer" loading="lazy">
                <p>Single Central Stringer</p>
              </a>
              <a class="type-item" href="#staircase-proste">
                <img class="lazy" src="staircase0.jpg" data-src="staircase1.jpg" alt="Straight Staircase" loading="lazy">
                <p>Straight Staircase</p>
              </a>
              <a class="type-item" href="#staircase-zewnetrzne">
                <img class="lazy" src="staircase0.jpg" data-src="staircase2.jpg" alt="Exterior Staircase" loading="lazy">
                <p>Exterior Staircase</p>
              </a>
              <a class="type-item" href="#staircase-spacesaving">
                <img class="lazy" src="staircase0.jpg" data-src="staircase3.jpg" alt="Space Saving Staircase" loading="lazy">
                <p>Space Saving</p>
              </a>
              <a class="type-item" href="#staircase-fireexit">
                <img class="lazy" src="staircase0.jpg" data-src="staircase1.jpg" alt="Fire Exit Staircase" loading="lazy">
                <p>Fire Exit</p>
              </a>
              <a class="type-item" href="#staircase-basement">
                <img class="lazy" src="staircase0.jpg" data-src="staircase2.jpg" alt="Basement Staircase" loading="lazy">
                <p>Basement Staircase</p>
              </a>
            </div>
          </div>
        </section>
        `,
      about: `
        <section class="about">
          <div class="container">
            <h2>About LM STAIRS</h2>
            <p>Founded in 1985, LM STAIRS has grown into a global leader in the design and fabrication of luxury metal staircases. With headquarters in London and multiple state-of-the-art production facilities, our extensive teams of experienced engineers, designers, and installers have delivered innovative, bespoke solutions for prestigious clients worldwide.</p>
            <p>Our commitment to quality, precision, and innovation is reflected in every project. Using the latest 3D laser measurement technology and advanced CAD systems, we create detailed fabrication drawings and execute projects to the highest standards. We focus our activities on London and its surrounding areas (including Westminster, Camden, Kensington, Islington, and the City of London), but we operate internationally and serve clients around the globe.</p>
            <p>At LM STAIRS, we combine traditional craftsmanship with cutting-edge technology, ensuring our clients receive the finest bespoke staircase solutions available.</p>
          </div>
        </section>
      `,
      services: `
        <section class="services">
          <div class="container">
            <h2>Our Services</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
              <div class="service-item">
                <i class="fas fa-ruler-combined"></i>
                <h3>Site Survey and Measurements</h3>
                <p>
                  We conduct thorough on‑site surveys and measurements using the latest measuring devices and 3D lasers.<br>
                  We manage every phase from initial assessment to final reporting.
                </p>
              </div>
              <div class="service-item">
                <i class="fas fa-pencil-ruler"></i>
                <h3>Design and Calculations</h3>
                <p>
                  Our designers use 3D CAD and prepare a complete set of drawings for project approval before production.<br>
                  Every detail is planned comprehensively.
                </p>
              </div>
              <div class="service-item">
                <i class="fas fa-drafting-compass"></i>
                <h3>Fabrication Drawings</h3>
                <p>
                  Detailed technical drawings to ensure flawless production.<br>
                  We cover every aspect from concept to manufacturing.
                </p>
              </div>
              <div class="service-item">
                <i class="fas fa-hammer"></i>
                <h3>Fabrication and Installation</h3>
                <p>
                  Expert fabrication and seamless installation by our skilled teams.<br>
                  We handle the complete process from production to final installation.
                </p>
              </div>
            </div>
          </div>
        </section>
      `,
      gallery: generateGalleryHTML("en"),
      faq: generateFAQContentEn(),
      contact: `
        <section class="contact-info" id="contact">
          <div class="container">
            <h2>Contact Information</h2>
            <p>For inquiries regarding our products or services, please contact us:</p>
            <p><strong>Email:</strong> <a href="mailto:info@londonmetalstairs.co.uk">info@londonmetalstairs.co.uk</a></p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/44123456789" target="_blank">+44 123 456 789</a></p>
            <p>We can assist you in English, Polish, and Mandarin.</p>
          </div>
        </section>
      `
    }
  };

  // ========================
  // 4. Build Application Structure
  // ========================
  const app = document.createElement("div");
  app.id = "app";
  document.body.appendChild(app);

  const headerContainer = document.createElement("header");
  headerContainer.id = "header-container";
  app.appendChild(headerContainer);

  const mainContainer = document.createElement("div");
  mainContainer.id = "main-content";
  app.appendChild(mainContainer);

  const footerContainer = document.createElement("footer");
  footerContainer.id = "footer-container";
  footerContainer.innerHTML = `<div class="container">
      <p>&copy; 2025 LM STAIRS. All Rights Reserved.</p>
      <div class="company-info">LONDONMETALSTAIRS.CO.UK</div>
    </div>`;
  app.appendChild(footerContainer);

  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  // ========================
  // Lightbox Modal for Gallery Images
  // ========================
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.display = 'none';
  lightbox.style.position = 'fixed';
  lightbox.style.top = '0';
  lightbox.style.left = '0';
  lightbox.style.width = '100%';
  lightbox.style.height = '100%';
  lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
  lightbox.style.justifyContent = 'center';
  lightbox.style.alignItems = 'center';
  lightbox.style.zIndex = '1200';
  lightbox.innerHTML = `
    <span id="lightbox-close" style="position:absolute; top:20px; right:30px; font-size:40px; color:#fff; cursor:pointer;">&times;</span>
    <img id="lightbox-img" src="" style="max-width:90%; max-height:90%;">
  `;
  document.body.appendChild(lightbox);

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if(e.target === lightbox) closeLightbox();
  });

  function openLightbox(src) {
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
  }

  function initLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
      img.addEventListener('click', function () { openLightbox(img.src); });
    });
  }

  // ========================
  // 5. Functions to Render Header and Attach Event Listeners
  // ========================
  function renderHeader() {
    const nav = navItems[currentLang];
    const langDropdownHTML = `
      <div class="lang-dropdown" id="lang-dropdown">
        <button id="lang-button">
          <img src="globe.png" alt="Language">
        </button>
        <ul id="lang-options">
          <li data-lang="en">English</li>
          <li data-lang="pl">Polski</li>
          <li data-lang="zh">中文</li>
        </ul>
      </div>
    `;
    // Używamy href="#staircaseTypes" (klucz bez myślnika) dla linku do sekcji typów schodów
    const headerContent = `
      <div class="container" style="display: flex; align-items: center; justify-content: space-between;">
        <div class="logo">
          <a href="#home"><img src="logo-placeholder.png" alt="LM STAIRS Logo"></a>
        </div>
        <nav id="nav-menu">
          <ul>
            <li><a href="#home">${nav.home}</a></li>
            <li><a href="#about">${nav.about}</a></li>
            <li><a href="#services">${nav.services}</a></li>
            <li><a href="#staircaseTypes">${nav.types}</a></li>
            <li><a href="#gallery">${nav.gallery}</a></li>
            <li><a href="#faq">${nav.faq}</a></li>
            <li><a href="#contact">${nav.contact}</a></li>
          </ul>
        </nav>
        <div style="display: flex; align-items: center;">
          ${langDropdownHTML}
          <div class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    `;
    headerContainer.innerHTML = headerContent;
    attachHeaderListeners();
  }

  function attachHeaderListeners() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const langDropdown = document.getElementById("lang-dropdown");
    const langButton = document.getElementById("lang-button");
    if (hamburger && navMenu && overlay && langDropdown) {
      hamburger.addEventListener("click", function () { toggleMenu(); });
      overlay.addEventListener("click", function () {
        navMenu.classList.remove("active");
        overlay.classList.remove("active");
        hamburger.classList.remove("open");
      });
      document.querySelectorAll("#nav-menu a").forEach(link => {
        link.addEventListener("click", function () {
          navMenu.classList.remove("active");
          overlay.classList.remove("active");
          hamburger.classList.remove("open");
        });
      });
      langButton.addEventListener("click", function (e) {
        e.stopPropagation();
        langDropdown.classList.toggle("active");
      });
      document.querySelectorAll("#lang-options li").forEach(item => {
        item.addEventListener("click", function () {
          const lang = this.getAttribute("data-lang");
          if (lang && lang !== currentLang) {
            currentLang = lang;
            renderHeader();
            loadPage();
            initCarousel();
            lazyLoadImages();
          }
          langDropdown.classList.remove("active");
        });
      });
      document.addEventListener("click", function () { langDropdown.classList.remove("active"); });
    } else {
      console.error("Could not find hamburger, nav-menu, overlay, or lang-dropdown elements.");
    }
  }

  function toggleMenu() {
    const navMenu = document.getElementById("nav-menu");
    const hamburger = document.getElementById("hamburger");
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    hamburger.classList.toggle("open");
  }

  // ========================
  // 6. Function to Load Page Content Based on Hash and Language
  // ========================
  function loadPage() {
    let hash = window.location.hash.substring(1);
    if (!hash) { hash = "home"; }
    const content = pageContent[currentLang][hash] || pageContent[currentLang].home;
    mainContainer.innerHTML = typeof content === "function" ? content() : content;
    initCarousel();
    lazyLoadImages();
    initLightbox();
  }
  window.addEventListener("hashchange", loadPage);

  // ========================
  // 7. Carousel Functionality
  // ========================
  function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    const slides = carousel.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    function showSlide(index) { carousel.style.transform = 'translateX(' + (-index * 100) + '%)'; }
    function nextSlide() { currentIndex = (currentIndex + 1) % slides.length; showSlide(currentIndex); }
    function prevSlide() { currentIndex = (currentIndex - 1 + slides.length) % slides.length; showSlide(currentIndex); }
    let slideInterval = setInterval(nextSlide, 5000);
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');
    if (nextButton) {
      nextButton.addEventListener('click', function() {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
      });
    }
    if (prevButton) {
      prevButton.addEventListener('click', function() {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
      });
    }
  }

  // ========================
  // 8. Lazy Loading Functionality
  // ========================
  function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img.lazy');
    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            lazyImageObserver.unobserve(img);
          }
        });
      });
      lazyImages.forEach(function(img) { lazyImageObserver.observe(img); });
    } else {
      lazyImages.forEach(function(img) { img.src = img.dataset.src; img.classList.remove('lazy'); });
    }
  }

  // ========================
  // 9. Initialization – Render Header, Load Page, Load Fonts
  // ========================
  renderHeader();
  loadPage();

  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+Pro:wght@400;600&display=swap";
  document.head.appendChild(fontLink);
})();
