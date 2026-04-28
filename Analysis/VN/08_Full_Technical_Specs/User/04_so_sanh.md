# TRANG: So Sánh Báo Giá
## 1. URL: `/compare/[id]` | Vai trò: Khách đăng ký (chủ yêu cầu)
## 2. CHỨC NĂNG: Lưới thẻ báo giá, so sánh 3 cạnh nhau, lọc giá/rating/kinh nghiệm, yêu thích
## 3. SERVER ACTIONS: `toggleFavorite` → INSERT/DELETE `partner_favorites`
## 4. BẢNG: `cleaning_requests`, `quotes`, `partners`, `partner_favorites`
## 5. RLS: `quotes_user_read`, `cleaning_requests_user_select`, `partner_favorites_user_*`
