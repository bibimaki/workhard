# Felinlove 💗 — เว็บเซอร์ไพรส์ครบรอบ 4 เดือน

เว็บ HTML/CSS/JS ล้วน ไม่ต้องติดตั้งอะไร ไม่มี build step

```
index.html          โครงหน้าเว็บ
css/style.css       สไตล์ทั้งหมด
js/content.js       ✏️ ข้อความทั้งหมด (แก้ที่นี่ที่เดียว)
js/app.js           ลูกเล่นและการทำงาน
assets/images/      🖼️ ใส่รูปที่นี่
assets/music/       🎵 ใส่เพลงที่นี่ (ไม่บังคับ)
```

## เปลี่ยนรูป
วางรูปใน `assets/images/` แล้วตั้งชื่อดังนี้ (นามสกุล jpg / jpeg / png / webp ได้หมด):

| ใช้ที่ | ชื่อไฟล์ |
|---|---|
| แกลเลอรี | `photo-1`, `photo-2`, `photo-3` … |
| Timeline | `month-1` … `month-4` |
| รูปเซอร์ไพรส์เต็มจอ | `surprise` |

ถ้ายังไม่มีรูป เว็บจะแสดงรูปชั่วคราวสีชมพูให้ก่อน
ต้องการรูปแกลเลอรีเพิ่ม/ลด → เพิ่ม/ลดรายการใน `photos` ของ `js/content.js` (1 รายการ = 1 รูป)
แนะนำย่อรูปให้ไม่เกิน ~1200px เพื่อให้เว็บโหลดเร็ว

## เปลี่ยนข้อความ
เปิด `js/content.js` แก้ได้เลย: ข้อความหน้าเปิด, คำบรรยายใต้รูป, ข้อความแต่ละเดือน, จดหมายลับ (`letter`), คำถามเกม (`game`), ข้อความ Easter eggs

## เพลงพื้นหลัง
วางไฟล์ชื่อ `song.mp3` ใน `assets/music/` (ไม่เปิดเองอัตโนมัติ — กดปุ่ม 🎵 มุมขวาล่าง)

## ลองดูในเครื่อง
```
npx serve .        # หรือ python3 -m http.server
```

## Deploy (GitHub + Vercel)
1. สร้าง repo ใหม่บน GitHub แล้ว push โฟลเดอร์นี้ขึ้นไป
   ```
   git init && git add . && git commit -m "Felinlove"
   git branch -M main && git remote add origin <URL ของ repo> && git push -u origin main
   ```
2. เข้า vercel.com → **Add New → Project** → เลือก repo
3. Framework Preset: **Other** (ไม่ต้องใส่ Build Command) → **Deploy**
4. ได้ลิงก์ส่งให้แฟนได้เลย 💌 (แก้ไฟล์แล้ว push ใหม่ → อัปเดตเอง)
