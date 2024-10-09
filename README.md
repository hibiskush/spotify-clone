
# Tổng Quan Dự Án

Dự án này là một phiên bản sao của ứng dụng Spotify, với mục tiêu tái hiện các tính năng chính của nền tảng phát nhạc trực tuyến phổ biến này. Những chức năng chính bao gồm:

- **Nghe Nhạc**: Người dùng có thể phát nhạc yêu thích một cách mượt mà trong ứng dụng.
- **Thêm Bài Hát**: Khả năng thêm bài hát mới vào thư viện hoặc danh sách phát của người dùng.
- **Yêu Thích**: Người dùng có thể đánh dấu bài hát yêu thích, giúp dễ dàng truy cập và thưởng thức các bản nhạc ưa thích.
- **Điều Khiển Âm Lượng**: Tính năng cho phép người dùng điều chỉnh âm lượng của bài hát đang phát hoặc tắt tiếng.
- **Quản Lý Tài Khoản**: Người dùng có thể tạo tài khoản và đăng nhập để cá nhân hóa trải nghiệm, bao gồm việc truy cập các bài hát và danh sách phát đã lưu.

## Công Nghệ Sử Dụng

Dự án sử dụng các công nghệ sau:

- **React**: Một thư viện JavaScript để xây dựng giao diện người dùng, cung cấp kiến trúc dựa trên component để mã dễ duy trì và phát triển.
- **Next.js**: Một framework React cho phép xây dựng các ứng dụng web được render từ phía server và sinh ra tĩnh, giúp cải thiện hiệu suất và SEO.
- **Tailwind CSS**: Một framework CSS tiên phong với triết lý "utility-first", giúp thiết kế giao diện người dùng đơn giản và phản hồi tốt bằng cách sử dụng các lớp có sẵn.
- **Supabase**: Một dịch vụ cơ sở dữ liệu đám mây bao gồm các tính năng cho xác thực, dữ liệu thời gian thực và lưu trữ. Supabase được sử dụng để quản lý tài khoản người dùng và lưu trữ dữ liệu liên quan đến âm nhạc.
- **PostgreSQL**: Hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở mạnh mẽ, được sử dụng cùng với Supabase để lưu trữ và tổ chức dữ liệu có cấu trúc hiệu quả.

## Cấu Trúc Dự Án

Dự án tuân theo một cấu trúc có tổ chức để duy trì sự rõ ràng và khả năng mở rộng:

### Mô tả các thư mục:

- **components/**: Bao gồm các component React tái sử dụng cho ứng dụng.
- **pages/**: Chứa các trang khác nhau của ứng dụng, mỗi trang tương ứng với một route.
- **styles/**: Chứa các stylesheet và cấu hình cho Tailwind CSS.
- **public/**: Chứa các tài nguyên tĩnh như hình ảnh, phông chữ và biểu tượng.
- **server/**: Chứa logic của backend, như các endpoint API hoặc xử lý yêu cầu.
- **database/**: Chứa các script và cấu hình liên quan đến cơ sở dữ liệu để khởi tạo schema.
