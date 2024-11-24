# Task Management Application

Bu proje, ekip içinde görevlerin takip edilmesini sağlayan bir web uygulamasıdır. React ve .NET Core kullanılarak geliştirilmiştir.

## Özellikler

- 👥 Kullanıcı yönetimi (Kayıt, Giriş, TC Kimlik doğrulama)
- 📋 Görev yönetimi (Oluşturma, Düzenleme, Silme)
- 🔄 Görev durumu takibi
- 👮 Role-based yetkilendirme (Admin/User)
- 🎨 Modern ve responsive tasarım

## Teknolojiler

### Frontend
- React (Vite)
- Tailwind CSS
- React Hook Form
- React Hot Toast
- Heroicons
- Date-fns
- JWT Authentication

### Backend
- .NET Core 8
- Entity Framework Core
- Clean Architecture
- JWT Authentication
- MSSQL

## Kurulum

### Backend
```bash
# Repository'yi klonlayın
git clone [repo-url]

# Veritabanını oluşturun
dotnet ef database update

# Projeyi çalıştırın
dotnet run
```

### Frontend
```bash
# Gerekli paketleri yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

## Kullanım

### Admin Hesabı
- Email: admin@taskmanagement.com
- Şifre: Admin123!

### Kullanıcı Rolleri

**Admin:**
- Tüm görevleri görüntüleme/düzenleme
- Kullanıcı yönetimi
- Görev atama/silme

**Normal Kullanıcı:**
- Kendi görevlerini görüntüleme
- Görev durumunu güncelleme
- Yeni görev oluşturma

### API Endpointleri

```text
GET    /api/tasks     - Tüm görevleri listele
POST   /api/tasks     - Yeni görev oluştur
PUT    /api/tasks/:id - Görev güncelle
DELETE /api/tasks/:id - Görev sil
```

## Proje Yapısı

```
src/
├── components/       # UI bileşenleri
├── context/         # React context'leri
├── hooks/           # Custom hooks
├── services/        # API servisleri
└── utils/          # Yardımcı fonksiyonlar
```

## Geliştirme Notları

- Backend'de Clean Architecture kullanılmıştır
- Frontend'de Context API ile state yönetimi yapılmıştır
- Tailwind ile responsive tasarım uygulanmıştır
- JWT ile güvenli kimlik doğrulama sağlanmıştır