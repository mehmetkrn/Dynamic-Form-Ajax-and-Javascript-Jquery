# 🧠 Dynamic Form Submit with AJAX & jQuery

Bu proje, HTML formlarını sayfa yenilemeden AJAX aracılığıyla backend’e göndermek için geliştirilmiştir. Form içerisindeki tüm input türlerini (text, file, checkbox, radio, select2) destekler. Ayrıca backend’den gelen başarılı veya hatalı yanıtlara göre yönlendirme, sayfa yenileme veya hata mesajı gösterme gibi işlemleri otomatikleştirir.

---

## 🎯 Projenin Amacı

- Sayfa yenilemeden form gönderimi yapmak  
- Geliştiriciye tek satırla esnek ve güvenli form işleme altyapısı sunmak  
- Backend’le haberleşmeyi kolaylaştırmak  
- Başarılı işlemlerde yönlendirme veya yenileme, hatalı işlemlerde ise detaylı uyarı vermek  

---

## 🚀 Özellikler

- 🔄 Sayfa yenilenmeden form gönderimi  
- 📂 `FormData` ile tüm form elemanlarının işlenmesi  
- ✅ Text, file, checkbox, radio, select2 gibi alan desteği  
- 🎯 SweetAlert2 ile başarılı işlem bildirimi  
- 🛠️ Hatalı işlemlerde otomatik hata kutusu oluşturma  
- 📎 Backend ile JSON üzerinden esnek iletişim  

---

## 💻 Kullanılan Teknolojiler

- **JavaScript (ES6+)**  
- **jQuery**  
- **AJAX**  
- **FormData API**  
- **SweetAlert2** (opsiyonel)  
- **Select2** (opsiyonel)  
- **.NET C# Backend (ViewModel JSON yanıtı)**  

---

## 📦 Kurulum

```bash
git clone https://github.com/mehmetkrn/Dynamic-Form-Ajax-and-Javascript-Jquery.git
```

🧾 Backend Cevap Yapısı (C# ViewModel)
```csharp
public class VMStatus
{
    public string IdentityGuidId { get; set; } = "";
    public bool IsSuccess { get; set; } = true;
    public string ErrorMessage { get; set; } = "";
    public string ResultData { get; set; } = "";
    public string ErrorDivId { get; set; } = "dvMessage";
    public List<string> ErrorMessages { get; set; } = new List<string>();

    public List<ValidationFailure> FluentErrors
    {
        set
        {
            foreach (var item in value)
                ErrorMessages.Add(item.ErrorMessage);
        }
    }
}
```

### ✅ JavaScript ile Form Gönderimi

```javascript
$(document).on('submit', '#postForm', function (e) {
    e.preventDefault();
    AjaxFormSubmit($(this));
    return false;
});
