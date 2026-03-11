import { useState, useEffect, useRef } from "react";

const DISEASES = [
  {
    id: "kah",
    name: "Koroner Arter Hastalığı",
    icon: "🫀",
    color: "#C62828",
    gradient: "linear-gradient(135deg, #C62828 0%, #E53935 100%)",
    summary: "Kalp damarlarının daralması veya tıkanması sonucu oluşan hastalık",
    yapilacaklar: [
      { title: "Düzenli Egzersiz", detail: "Haftada en az 150 dakika orta yoğunlukta yürüyüş veya bisiklet. Doktorunuzun önerdiği tempoda başlayın." },
      { title: "Kalp Dostu Beslenme", detail: "Akdeniz diyeti tercih edin: bol sebze-meyve, zeytinyağı, balık, tam tahıllar. Tuz alımını günde 5 gramın altında tutun." },
      { title: "İlaç Uyumu", detail: "Aspirin, statin ve tansiyon ilaçlarınızı doktorunuzun söylediği şekilde her gün düzenli kullanın. Asla kendi kendinize kesmeyin." },
      { title: "Stres Yönetimi", detail: "Derin nefes egzersizleri, meditasyon veya hobi edinin. Kronik stres kalp hastalığını kötüleştirir." },
      { title: "Düzenli Kontrol", detail: "3-6 ayda bir kardiyoloji kontrolüne gidin. Kolesterol ve tansiyon değerlerinizi takip edin." },
      { title: "Sigarayı Bırakın", detail: "Sigara kalp damarlarını doğrudan hasarlar. Bırakma desteği için doktorunuzla konuşun." }
    ],
    kacinilacaklar: [
      { title: "Aşırı Yağlı Yiyecekler", detail: "Kızartma, işlenmiş et ürünleri (sosis, sucuk, pastırma), margarin ve trans yağlardan uzak durun." },
      { title: "Sigara ve Alkol", detail: "Sigara kesinlikle yasak. Alkol tüketimini minimumda tutun veya tamamen bırakın." },
      { title: "Aşırı Tuz", detail: "Hazır gıdalar, turşu, salamura ve tuzlu atıştırmalıklardan kaçının." },
      { title: "Hareketsiz Yaşam", detail: "Uzun süre oturmaktan kaçının. Her saat başı kalkıp 5 dakika yürüyün." },
      { title: "Ani Ağır Efor", detail: "Doktorunuza danışmadan ağır kaldırma, yoğun spor yapma gibi aktivitelerden kaçının." },
      { title: "İlaç Değişikliği", detail: "Doktorunuza sormadan ilaç dozu değiştirmeyin, ilacı kesmeyin veya başka ilaç eklemeyin." }
    ],
    ilaclar: [
      { name: "Aspirin", note: "Her gün aynı saatte, tok karnına alın. Mide şikayeti olursa doktorunuza bildirin." },
      { name: "Statin (Kolesterol İlacı)", note: "Genellikle akşam alınır. Kas ağrısı olursa doktorunuza haber verin." },
      { name: "Beta Bloker", note: "Nabzı yavaşlatır, düzenli kullanın. Ani kesmeyin." },
      { name: "ACE İnhibitörü / ARB", note: "Tansiyonu düzenler. Kuru öksürük yan etkisi olabilir." }
    ],
    acilDurum: [
      { belirti: "Göğüs ağrısı veya baskı hissi (5 dakikadan uzun süren)", eylem: "Hemen 112'yi arayın. Aspirin çiğneyin (allerji yoksa)." },
      { belirti: "Nefes darlığı ile birlikte terleme", eylem: "Hareket etmeyin, oturun ve 112'yi arayın." },
      { belirti: "Sol kola, çeneye veya sırta yayılan ağrı", eylem: "Kalp krizi belirtisi olabilir — acil yardım çağırın." },
      { belirti: "Bayılma veya baş dönmesi", eylem: "Düz yere uzanın, bacaklarınızı yukarı kaldırın, 112'yi arayın." }
    ]
  },
  {
    id: "ky",
    name: "Kalp Yetmezliği",
    icon: "💙",
    color: "#1565C0",
    gradient: "linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)",
    summary: "Kalbin vücuda yeterli kanı pompalayamadığı durum",
    yapilacaklar: [
      { title: "Sıvı Kısıtlaması", detail: "Günde 1.5-2 litre sıvı tüketin (su, çay, çorba dahil). Doktorunuzun önerisine göre ayarlayın." },
      { title: "Günlük Tartı Takibi", detail: "Her sabah aynı saatte, aç karnına tartılın. 2-3 günde 2 kg'dan fazla artış olursa doktorunuzu arayın." },
      { title: "Tuz Kısıtlaması", detail: "Günde 2 gramın altında tuz tüketin. Hazır gıdalardan uzak durun." },
      { title: "Hafif Egzersiz", detail: "Doktorunuzun onayladığı tempoda düzenli yürüyüş yapın. Yorulduğunuzda durun." },
      { title: "İlaç Düzeni", detail: "Diüretik, ACE inhibitörü, beta bloker gibi ilaçlarınızı düzenli ve zamanında alın." },
      { title: "Grip/Zatürre Aşısı", detail: "Yıllık grip ve zatürre aşılarınızı yaptırın. Enfeksiyonlar kalp yetmezliğini kötüleştirir." }
    ],
    kacinilacaklar: [
      { title: "Fazla Sıvı", detail: "Günlük sıvı limitinizi aşmayın. Susadığınızda buz parçası emmek yardımcı olabilir." },
      { title: "Tuzlu Gıdalar", detail: "Çips, kuruyemiş, turşu, konserve, hazır çorbalar ve fast food'dan kaçının." },
      { title: "NSAİİ İlaçlar", detail: "İbuprofen, naproksen gibi ağrı kesicileri kullanmayın — sıvı tutulumunu artırır." },
      { title: "Alkol", detail: "Alkol kalp kasını zayıflatır. Tamamen bırakmanız önerilir." },
      { title: "Aşırı Efor", detail: "Ağır kaldırma ve nefes nefese kalacağınız aktivitelerden kaçının." },
      { title: "İlaç Aksatma", detail: "İyi hissetseniz bile ilaçlarınızı kesmeyin. Düzelme ilaçlar sayesindedir." }
    ],
    ilaclar: [
      { name: "Diüretik (Furosemid vb.)", note: "Sabah alın, gece sık idrara çıkmayı önler. Potasyum düzeyinizi takip ettirin." },
      { name: "ACE İnhibitörü / ARB / ARNI", note: "Kalbin iş yükünü azaltır. Düzenli kullanın." },
      { name: "Beta Bloker", note: "Düşük dozdan başlanır, kademeli artırılır. Ani kesmeyin." },
      { name: "MRA (Spironolakton)", note: "Potasyum yükselebilir, düzenli kan testi gerekir." }
    ],
    acilDurum: [
      { belirti: "Ani şiddetli nefes darlığı (özellikle yatınca artan)", eylem: "Oturur pozisyona geçin, 112'yi arayın." },
      { belirti: "3 günde 2 kg'dan fazla kilo artışı", eylem: "Sıvı tutulumu — doktorunuzu hemen arayın." },
      { belirti: "Bacaklarda belirgin şişlik artışı", eylem: "Doktorunuzu bilgilendirin, diüretik dozunuz ayarlanabilir." },
      { belirti: "Göğüs ağrısı veya çarpıntı", eylem: "112'yi arayın, hareket etmeden bekleyin." }
    ]
  },
  {
    id: "af",
    name: "Atriyal Fibrilasyon",
    icon: "⚡",
    color: "#6A1B9A",
    gradient: "linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)",
    summary: "Kalbin düzensiz ve hızlı atması durumu",
    yapilacaklar: [
      { title: "Nabız Kontrolü", detail: "Günde 1-2 kez bileğinizden nabzınızı sayın veya tansiyon aletinizle ölçün. Düzensizlik varsa not edin." },
      { title: "Kan Sulandırıcı Uyumu", detail: "İnme riskini azaltmak için kan sulandırıcınızı her gün aynı saatte, aksatmadan alın." },
      { title: "Tetikleyicileri Tanıyın", detail: "Kafein, alkol, stres, uykusuzluk — hangisi atağı tetikliyor? Günlük tutun." },
      { title: "Sağlıklı Kilo", detail: "Fazla kilo AF ataklarını sıklaştırır. İdeal kilonuza ulaşmaya çalışın." },
      { title: "Uyku Düzeni", detail: "Düzenli ve yeterli uyku alın. Uyku apnesi şüphesi varsa doktorunuza söyleyin." },
      { title: "Kontrol Randevuları", detail: "Düzenli EKG ve kan testi (INR veya böbrek fonksiyonu) takibi yaptırın." }
    ],
    kacinilacaklar: [
      { title: "Aşırı Kafein", detail: "Fazla kahve, enerji içeceği ve çay atağı tetikleyebilir. Günde 1-2 fincan ile sınırlayın." },
      { title: "Alkol", detail: "Özellikle aşırı alkol AF atağını tetikler. Mümkünse tamamen bırakın." },
      { title: "İlaç Atlama", detail: "Kan sulandırıcıyı bir gün bile atlamak inme riskini artırır." },
      { title: "Bitkisel Takviyeler", detail: "Sarımsak, ginkgo, omega-3 gibi takviyeler kan sulandırıcıyla etkileşebilir. Doktorunuza danışın." },
      { title: "Aşırı Stres", detail: "Stres ve öfke atakları tetikleyebilir. Rahatlama tekniklerini öğrenin." },
      { title: "Düzensiz Uyku", detail: "Geç yatma, vardiyalı çalışma gibi düzensizliklerden kaçının." }
    ],
    ilaclar: [
      { name: "Kan Sulandırıcı (Apiksaban, Rivaroksaban, Varfarin vb.)", note: "İnmeyi önler. Her gün aynı saatte alın. Varfarin kullanıyorsanız düzenli INR ölçtürün." },
      { name: "Hız Kontrol İlacı (Beta Bloker, Kalsiyum Kanal Blokeri)", note: "Kalp hızını yavaşlatır. Nabzınız çok düşerse doktorunuza haber verin." },
      { name: "Antiaritmik İlaç", note: "Ritmi düzenler. Yan etkileri dikkatle takip edilmelidir." }
    ],
    acilDurum: [
      { belirti: "Ani şiddetli çarpıntı (30 dakikadan uzun)", eylem: "112'yi arayın. Valsalva manevrası deneyebilirsiniz (doktorunuz öğrettiyse)." },
      { belirti: "Yüzde, kolda güçsüzlük veya konuşma bozukluğu", eylem: "İNME BELİRTİSİ — Derhal 112'yi arayın. Dakikalar hayat kurtarır!" },
      { belirti: "Göğüs ağrısı + nefes darlığı", eylem: "Hemen 112'yi arayın." },
      { belirti: "Bayılma veya göz kararması", eylem: "Düz yere uzanın, 112'yi arayın." }
    ]
  },
  {
    id: "ht",
    name: "Hipertansiyon",
    icon: "🩺",
    color: "#E65100",
    gradient: "linear-gradient(135deg, #E65100 0%, #F57C00 100%)",
    summary: "Yüksek tansiyon — sessiz ama tehlikeli",
    yapilacaklar: [
      { title: "Ev Tansiyon Ölçümü", detail: "Sabah ve akşam, 5 dakika oturduktan sonra ölçün. Değerleri not edin ve kontrole getirin." },
      { title: "DASH Diyeti", detail: "Bol meyve, sebze, az yağlı süt ürünleri, tam tahıllar. Kırmızı eti azaltın." },
      { title: "Tuz Azaltma", detail: "Günde 5 gramın altında tuz. Yemeklere sofrada tuz eklemeyin." },
      { title: "Düzenli Egzersiz", detail: "Haftada 5 gün, 30 dakika tempolu yürüyüş. Tansiyonu 5-8 mmHg düşürebilir." },
      { title: "Kilo Kontrolü", detail: "Her 1 kg vermek tansiyonu yaklaşık 1 mmHg düşürür." },
      { title: "İlaç Uyumu", detail: "Tansiyon ilacınızı her gün aynı saatte alın. İyi olduğunuzu hissetseniz bile bırakmayın." }
    ],
    kacinilacaklar: [
      { title: "Tuz ve Sodyum", detail: "Hazır gıdalar, konserve, cips, peynir çeşitleri — hepsi gizli tuz kaynağı." },
      { title: "Sigara", detail: "Her sigara tansiyonu geçici olarak yükseltir ve damarları kalıcı olarak hasarlar." },
      { title: "Aşırı Alkol", detail: "Alkol tansiyonu yükseltir ve ilacınızın etkisini azaltır." },
      { title: "Stres", detail: "Kronik stres tansiyonu sürekli yüksek tutar. Baş etme yöntemleri geliştirin." },
      { title: "NSAİİ Kullanımı", detail: "İbuprofen gibi ağrı kesiciler tansiyonu yükseltir. Parasetamol tercih edin." },
      { title: "Meyan Kökü", detail: "Meyan kökü içeren yiyecek ve içecekler tansiyonu yükseltir." }
    ],
    ilaclar: [
      { name: "ACE İnhibitörü (Ramipril, Enalapril vb.)", note: "Sabah alınır. Kuru öksürük yapabilir — doktorunuza söyleyin." },
      { name: "ARB (Valsartan, Losartan vb.)", note: "ACE inhibitörüne alternatif. Daha az öksürük yapar." },
      { name: "Kalsiyum Kanal Blokeri (Amlodipin)", note: "Ayak bileği şişliği yapabilir. Greyfurt ile etkileşir!" },
      { name: "Diüretik (Hidroklorotiyazid)", note: "Sabah alın. Potasyum düşüklüğüne dikkat." }
    ],
    acilDurum: [
      { belirti: "Tansiyon 180/120 üzeri + baş ağrısı", eylem: "Hipertansif kriz — 112'yi arayın." },
      { belirti: "Bulanık görme veya göz kararması", eylem: "Hemen acile gidin." },
      { belirti: "Şiddetli baş ağrısı + bulantı/kusma", eylem: "Hareket etmeyin, 112'yi arayın." },
      { belirti: "Burun kanaması (uzun süren)", eylem: "Başınızı öne eğin, burnu sıkın. 15 dakikada durmazsa acile gidin." }
    ]
  },
  {
    id: "kapak",
    name: "Kalp Kapak Hastalığı",
    icon: "🔄",
    color: "#00695C",
    gradient: "linear-gradient(135deg, #00695C 0%, #00897B 100%)",
    summary: "Kalp kapaklarının yeterince açılamaması veya kapanamaması",
    yapilacaklar: [
      { title: "Düzenli Ekokardiyografi", detail: "6-12 ayda bir ekokardiyografi ile kapak fonksiyonu ve kalp boyutları takip edilmelidir." },
      { title: "Endokardit Profilaksisi", detail: "Diş işlemleri veya bazı cerrahi işlemlerden önce antibiyotik almanız gerekebilir. Doktorunuza danışın." },
      { title: "Semptom Takibi", detail: "Nefes darlığı, çarpıntı, baş dönmesi, göğüs ağrısı gibi belirtileri not edin." },
      { title: "Hafif-Orta Egzersiz", detail: "Doktorunuzun onayladığı seviyede düzenli egzersiz yapın." },
      { title: "Diş Sağlığı", detail: "Düzenli diş kontrolü çok önemli — ağız enfeksiyonları kalp kapağına yerleşebilir." },
      { title: "İlaç Düzeni", detail: "Varfarin kullanıyorsanız INR takibini düzenli yaptırın." }
    ],
    kacinilacaklar: [
      { title: "Ağır Fiziksel Efor", detail: "Ciddi kapak hastalığında ağır egzersiz tehlikeli olabilir. Doktorunuza danışın." },
      { title: "Diş Tedavisi İhmali", detail: "Tedavisiz diş enfeksiyonları endokardite (kalp kapağı enfeksiyonu) yol açabilir." },
      { title: "Kontrolsüz İlaç Kullanımı", detail: "Özellikle kan sulandırıcı kullanıyorsanız, hiçbir ilacı danışmadan eklemeyin." },
      { title: "K Vitamini Değişimleri", detail: "Varfarin kullanıyorsanız yeşil yapraklı sebze tüketimini sabit tutun, ani artırmayın/azaltmayın." },
      { title: "Enfeksiyon Riskli Ortamlar", detail: "Grip mevsiminde kalabalık ortamlardan kaçının, maske kullanın." },
      { title: "Gebelik Planı (Danışmadan)", detail: "Kapak hastalığı olan kadınlar gebelik öncesi mutlaka kardiyoloji değerlendirmesi yaptırmalı." }
    ],
    ilaclar: [
      { name: "Varfarin (Mekanik kapak)", note: "Düzenli INR takibi şart. Doz ayarını doktorunuz yapar. K vitamini alımını sabit tutun." },
      { name: "DOAK (Biyoprotez kapak sonrası)", note: "Mekanik kapakta kullanılmaz! Sadece doktorunuz önerdiyse." },
      { name: "Diüretik", note: "Şikayetler artarsa sıvı yükünü azaltmak için verilebilir." },
      { name: "Beta Bloker", note: "Kalp hızını kontrol eder, özellikle AF eşlik ediyorsa." }
    ],
    acilDurum: [
      { belirti: "Ani şiddetli nefes darlığı", eylem: "Oturun, 112'yi arayın." },
      { belirti: "Bayılma (senkop)", eylem: "Ciddi kapak darlığı belirtisi olabilir — acil değerlendirme şart." },
      { belirti: "Ateş + titreme (kapak protezi varsa)", eylem: "Endokardit şüphesi — hemen acile gidin." },
      { belirti: "Ani kol/bacak güçsüzlüğü veya konuşma bozukluğu", eylem: "Embolik olay (inme) — derhal 112'yi arayın." }
    ]
  },
  {
    id: "mi",
    name: "Miyokard İnfarktüsü Sonrası",
    icon: "🏥",
    color: "#AD1457",
    gradient: "linear-gradient(135deg, #AD1457 0%, #D81B60 100%)",
    summary: "Kalp krizi sonrası iyileşme ve korunma rehberi",
    yapilacaklar: [
      { title: "Kardiyak Rehabilitasyon", detail: "Doktorunuzun önerdiği rehabilitasyon programına katılın. İyileşmeyi hızlandırır ve tekrar riski azaltır." },
      { title: "Kademeli Aktivite", detail: "İlk haftalarda hafif yürüyüşle başlayın. 6-8 haftada normal aktiviteye dönebilirsiniz." },
      { title: "İlaç Tedavisi", detail: "Çifte antiplatelet, statin, beta bloker, ACE inhibitörü — hepsini düzenli kullanın." },
      { title: "Risk Faktörü Kontrolü", detail: "Tansiyon <130/80, LDL <55, HbA1c <7 hedefleyin. Düzenli kontrol yaptırın." },
      { title: "Psikolojik Destek", detail: "Kalp krizi sonrası kaygı ve depresyon sık görülür. Profesyonel destek almaktan çekinmeyin." },
      { title: "Cinsel Aktivite", detail: "2 merdiven çıkabiliyorsanız genelde güvenlidir. Doktorunuzla açıkça konuşun." }
    ],
    kacinilacaklar: [
      { title: "Sigara", detail: "Kesinlikle bırakın. Tekrar infarkt riskini %50 azaltır." },
      { title: "Ani Ağır Efor", detail: "İlk 6 hafta ağır kaldırma, yoğun spor yapmayın." },
      { title: "Stresli Ortamlar", detail: "Aşırı stresli durumlardan kaçının. Stres yönetimi öğrenin." },
      { title: "İlaç İhmali", detail: "Özellikle çifte antiplatelet tedaviyi stent varsa en az 12 ay kullanın." },
      { title: "Doymuş Yağlar", detail: "Kırmızı et, tereyağı, krema ve işlenmiş gıdaları minimuma indirin." },
      { title: "Araç Kullanımı (Erken Dönem)", detail: "İlk 1-4 hafta araç kullanmayın. Doktorunuzun onayını alın." }
    ],
    ilaclar: [
      { name: "Aspirin", note: "Ömür boyu kullanım. Mide koruyucu ile birlikte alabilirsiniz." },
      { name: "P2Y12 İnhibitörü (Klopidogrel, Tikagrelor)", note: "Stent sonrası en az 12 ay. Erken kesmeyin!" },
      { name: "Yüksek Doz Statin", note: "LDL <55 hedefi. Kas ağrısı olursa doktorunuza söyleyin." },
      { name: "Beta Bloker", note: "Kalbi korur, tekrar infarkt riskini azaltır. Ani kesmeyin." }
    ],
    acilDurum: [
      { belirti: "Tekrar göğüs ağrısı (ilk sefere benzer)", eylem: "TEKRAR İNFARKT olabilir — Derhal 112'yi arayın!" },
      { belirti: "Artan nefes darlığı + ödem", eylem: "Kalp yetmezliği gelişiyor olabilir — acile gidin." },
      { belirti: "Çarpıntı + baş dönmesi", eylem: "Aritmi olabilir — 112'yi arayın." },
      { belirti: "Stent bölgesinde ağrı (kateter giriş yeri)", eylem: "Şişlik, kızarıklık veya kanama varsa acile gidin." }
    ]
  }
];

const TabButton = ({ active, onClick, children, color }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 16px",
      border: "none",
      borderBottom: active ? `3px solid ${color}` : "3px solid transparent",
      background: active ? `${color}11` : "transparent",
      color: active ? color : "#555",
      fontWeight: active ? 700 : 500,
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontSize: "14px",
      fontFamily: "'Nunito', sans-serif",
      whiteSpace: "nowrap"
    }}
  >
    {children}
  </button>
);

const Card = ({ item, color, icon }) => (
  <div style={{
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "10px",
    borderLeft: `4px solid ${color}`,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease"
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; }}
  >
    <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "6px", color: "#222", fontFamily: "'Nunito', sans-serif" }}>
      {icon} {item.title || item.name || item.belirti}
    </div>
    <div style={{ fontSize: "14px", color: "#555", lineHeight: 1.6, fontFamily: "'Nunito', sans-serif" }}>
      {item.detail || item.note || item.eylem}
    </div>
  </div>
);

const QRSection = ({ disease }) => {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`Kardiyoloji Hasta Rehberi: ${disease.name} - Bu QR kod hastane bilgi sistemiyle entegre edildiğinde doğrudan hasta sayfasına yönlendirecektir.`)}`;
  
  return (
    <div style={{
      background: "#f8f9fa",
      borderRadius: "16px",
      padding: "24px",
      textAlign: "center",
      marginTop: "16px"
    }}>
      <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px", color: "#333", fontFamily: "'Nunito', sans-serif" }}>
        📱 QR Kod ile Hasta Erişimi
      </div>
      <div style={{
        background: "#fff",
        display: "inline-block",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}>
        <img
          src={qrUrl}
          alt="QR Kod"
          style={{ width: "160px", height: "160px" }}
        />
      </div>
      <div style={{ fontSize: "13px", color: "#777", marginTop: "12px", fontFamily: "'Nunito', sans-serif", maxWidth: "300px", margin: "12px auto 0" }}>
        Bu QR kodu muayenehaneye asabilirsiniz. Hasta telefonuyla tarayarak bilgilere erişebilir.
      </div>
    </div>
  );
};

export default function App() {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [activeTab, setActiveTab] = useState("yapilacaklar");
  const [searchText, setSearchText] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab, selectedDisease]);

  const filteredDiseases = DISEASES.filter(d =>
    d.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const tabs = [
    { key: "yapilacaklar", label: "✅ Yapılacaklar", emoji: "✅" },
    { key: "kacinilacaklar", label: "⛔ Kaçınılacaklar", emoji: "⛔" },
    { key: "ilaclar", label: "💊 İlaçlar", emoji: "💊" },
    { key: "acilDurum", label: "🚨 Acil Durum", emoji: "🚨" },
    { key: "qr", label: "📱 QR Kod", emoji: "📱" }
  ];

  const disease = selectedDisease ? DISEASES.find(d => d.id === selectedDisease) : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg, #f0f4f8 0%, #e8edf2 50%, #f5f0eb 100%)",
      fontFamily: "'Nunito', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a237e 0%, #283593 40%, #3949ab 100%)",
        padding: "20px 24px",
        color: "#fff",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-20px",
          left: "30%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
        }} />
        {selectedDisease ? (
          <div>
            <button
              onClick={() => { setSelectedDisease(null); setActiveTab("yapilacaklar"); }}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "#fff",
                padding: "6px 14px",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "'Nunito', sans-serif",
                marginBottom: "10px",
                backdropFilter: "blur(4px)"
              }}
            >
              ← Geri Dön
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "36px" }}>{disease.icon}</span>
              <div>
                <h1 style={{
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 800,
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: "-0.3px"
                }}>{disease.name}</h1>
                <p style={{ margin: "4px 0 0", fontSize: "13px", opacity: 0.85 }}>{disease.summary}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              <span style={{ fontSize: "28px" }}>🫀</span>
              <h1 style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: 900,
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "-0.3px"
              }}>Kardiyoloji Hasta Rehberi</h1>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: "13px", opacity: 0.8 }}>
              Hastalığınızı seçerek size özel bilgilere ulaşın
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      {!selectedDisease ? (
        <div style={{ padding: "16px 16px 80px" }}>
          {/* Search */}
          <div style={{
            position: "relative",
            marginBottom: "16px"
          }}>
            <input
              type="text"
              placeholder="Hastalık ara..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px 12px 40px",
                border: "2px solid #e0e0e0",
                borderRadius: "12px",
                fontSize: "15px",
                fontFamily: "'Nunito', sans-serif",
                background: "#fff",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box"
              }}
              onFocus={e => e.target.style.borderColor = "#3949ab"}
              onBlur={e => e.target.style.borderColor = "#e0e0e0"}
            />
            <span style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
              opacity: 0.4
            }}>🔍</span>
          </div>

          {/* Disease Cards */}
          <div style={{ display: "grid", gap: "12px" }}>
            {filteredDiseases.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setSelectedDisease(d.id)}
                style={{
                  background: "#fff",
                  border: "none",
                  borderRadius: "16px",
                  padding: "18px 20px",
                  cursor: "pointer",
                  textAlign: "left",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  position: "relative",
                  overflow: "hidden",
                  animation: `fadeSlideIn 0.3s ease ${i * 0.05}s both`
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                }}
              >
                <div style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  background: d.gradient,
                  borderRadius: "4px 0 0 4px"
                }} />
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "14px",
                  background: `${d.color}12`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  flexShrink: 0
                }}>
                  {d.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: 800,
                    fontSize: "16px",
                    color: "#222",
                    fontFamily: "'Nunito', sans-serif",
                    marginBottom: "3px"
                  }}>{d.name}</div>
                  <div style={{
                    fontSize: "13px",
                    color: "#777",
                    fontFamily: "'Nunito', sans-serif"
                  }}>{d.summary}</div>
                </div>
                <div style={{
                  color: d.color,
                  fontSize: "20px",
                  opacity: 0.5,
                  flexShrink: 0
                }}>›</div>
              </button>
            ))}
          </div>

          {/* Footer info */}
          <div style={{
            marginTop: "24px",
            padding: "16px",
            background: "rgba(57,73,171,0.06)",
            borderRadius: "12px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "13px", color: "#555", lineHeight: 1.6, fontFamily: "'Nunito', sans-serif" }}>
              ⚕️ Bu rehber genel bilgilendirme amaçlıdır.<br />
              Tedavinizle ilgili kararları doktorunuzla birlikte verin.
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Tabs */}
          <div style={{
            display: "flex",
            overflowX: "auto",
            background: "#fff",
            borderBottom: "1px solid #eee",
            padding: "0 8px",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}>
            {tabs.map(tab => (
              <TabButton
                key={tab.key}
                active={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                color={disease.color}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>

          {/* Tab Content */}
          <div ref={contentRef} style={{ padding: "16px 16px 80px", maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}>
            {activeTab === "yapilacaklar" && (
              <div>
                <div style={{
                  background: `${disease.color}08`,
                  borderRadius: "12px",
                  padding: "14px 16px",
                  marginBottom: "16px",
                  border: `1px solid ${disease.color}20`
                }}>
                  <div style={{ fontSize: "14px", color: "#444", fontFamily: "'Nunito', sans-serif" }}>
                    ✅ <strong>İyileşmeniz ve sağlığınızı korumanız için yapmanız gerekenler</strong>
                  </div>
                </div>
                {disease.yapilacaklar.map((item, i) => (
                  <Card key={i} item={item} color={disease.color} icon="✅" />
                ))}
              </div>
            )}

            {activeTab === "kacinilacaklar" && (
              <div>
                <div style={{
                  background: "#fff3e0",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  marginBottom: "16px",
                  border: "1px solid #ffe0b2"
                }}>
                  <div style={{ fontSize: "14px", color: "#444", fontFamily: "'Nunito', sans-serif" }}>
                    ⛔ <strong>Hastalığınızı kötüleştirebilecek durumlardan kaçının</strong>
                  </div>
                </div>
                {disease.kacinilacaklar.map((item, i) => (
                  <Card key={i} item={item} color="#E65100" icon="⛔" />
                ))}
              </div>
            )}

            {activeTab === "ilaclar" && (
              <div>
                <div style={{
                  background: "#e8f5e9",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  marginBottom: "16px",
                  border: "1px solid #c8e6c9"
                }}>
                  <div style={{ fontSize: "14px", color: "#444", fontFamily: "'Nunito', sans-serif" }}>
                    💊 <strong>İlaçlarınızı düzenli ve doğru şekilde kullanmak çok önemlidir</strong>
                  </div>
                </div>
                {disease.ilaclar.map((item, i) => (
                  <Card key={i} item={item} color="#2E7D32" icon="💊" />
                ))}
                <div style={{
                  background: "#fff8e1",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  marginTop: "16px",
                  border: "1px solid #ffecb3"
                }}>
                  <div style={{ fontSize: "13px", color: "#666", fontFamily: "'Nunito', sans-serif", lineHeight: 1.6 }}>
                    ⚠️ <strong>Önemli:</strong> Bu ilaç bilgileri genel rehberdir. Doktorunuzun size özel verdiği ilaç listesi ve dozlarına uyun. Yan etki hissederseniz ilacı bırakmadan önce doktorunuza danışın.
                  </div>
                </div>
              </div>
            )}

            {activeTab === "acilDurum" && (
              <div>
                <div style={{
                  background: "#ffebee",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  marginBottom: "16px",
                  border: "1px solid #ffcdd2"
                }}>
                  <div style={{ fontSize: "14px", color: "#c62828", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                    🚨 Bu belirtilerde vakit kaybetmeden harekete geçin!
                  </div>
                </div>
                {disease.acilDurum.map((item, i) => (
                  <div key={i} style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "16px",
                    marginBottom: "10px",
                    borderLeft: "4px solid #C62828",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
                  }}>
                    <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "8px", color: "#C62828", fontFamily: "'Nunito', sans-serif" }}>
                      ⚠️ {item.belirti}
                    </div>
                    <div style={{
                      fontSize: "14px",
                      color: "#333",
                      lineHeight: 1.6,
                      fontFamily: "'Nunito', sans-serif",
                      background: "#f5f5f5",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      fontWeight: 600
                    }}>
                      → {item.eylem}
                    </div>
                  </div>
                ))}
                <div style={{
                  background: "linear-gradient(135deg, #C62828, #E53935)",
                  borderRadius: "16px",
                  padding: "20px",
                  marginTop: "16px",
                  textAlign: "center",
                  color: "#fff"
                }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>📞</div>
                  <div style={{ fontSize: "28px", fontWeight: 900, fontFamily: "'Nunito', sans-serif", letterSpacing: "2px" }}>112</div>
                  <div style={{ fontSize: "14px", marginTop: "4px", opacity: 0.9 }}>Acil Sağlık Hattı</div>
                </div>
              </div>
            )}

            {activeTab === "qr" && (
              <QRSection disease={disease} />
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
