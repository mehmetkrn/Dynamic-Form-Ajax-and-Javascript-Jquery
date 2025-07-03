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
### 🧾 Kütüphaneler
```
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- SweetAlert2 (opsiyonel) -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<!-- Select2 (opsiyonel) -->
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
``` 
### ✅ JavaScript ile Form Gönderimi

```javascript
$(document).on('submit', '#postForm', function (e) {
    e.preventDefault();
    AjaxFormSubmit($(this));
    return false;
});
```

### ✅ HTML Form Yapısı
```Html
@using (Html.BeginForm("SaveData", "Datas", FormMethod.Post, new { id = "postForm", enctype = "multipart/form-data" }))
{
  <input type="text" name="username" placeholder="Kullanıcı Adı" />
  <input type="file" name="uploadFile" />
  <select name="categories" multiple></select>
  <button type="submit">Gönder</button>
}

<div id="dvMessageBox" style="display:none">
  <div id="dvMessage"></div>
</div>
```


## ✅ Backend Yapısı

Formdan gelen veriler `ViewModel` yapısında karşılanır ve işlenir. Başarı veya hata durumları JSON formatında geri döndürülür.

```csharp
public class Datas
{
    [HttpPost]
    public string SaveData(VMModel model)
    {
        BaseReturn result = new BaseReturn();

        if (model.Data.Title == "")
            result.ErrorMessages.Add("Başlık alanı boş bırakılamaz.");

        if (result.IsSuccess)
        {
            // Veritabanı işlemleri yapılabilir
        }

        if (!result.IsSuccess)
        {
            foreach (var item in result.ErrorMessages)
            {
                model.Status.ErrorMessages.Add(item);
            }
            model.Status.IsSuccess = result.IsSuccess;
        }
        else
        {
            model.Status.ResultData = "";
        }

        return model.StatusJson;
    }
}

ViewModel sınıfı ise statü yönetimi, işlemlerin sonucunda JSON formatında cevap üretir.

public class ViewModelBase
{
    public void ReturnStatusJson(BaseReturn result, string resultData = "")
    {
        if (!result.IsSuccess)
        {
            foreach (var item in result.ErrorMessages)
            {
                this.Status.ErrorMessages.Add(item);
            }
            this.Status.IsSuccess = result.IsSuccess;
        }

        this.Status.ResultData = resultData;
    }
  
    public VMStatus Status { get; set; } = new VMStatus();

    public string StatusJson
    {
        get
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(Status);
        }
    }
}

public class VMStatus
{
    public string IdentityGuidId { get; set; } = "";
    public bool IsSuccess { get; set; } = true;
    public string ErrorMessage { get; set; } = "";
    public string ResultData { get; set; } = "";
    public string ErrorDivId { get; set; } = "dvMessage";
    public List<string> ErrorMessages { get; set; } = new List<string>(); 
}

```
