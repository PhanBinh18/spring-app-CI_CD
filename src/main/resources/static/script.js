// Đảm bảo code chỉ chạy sau khi toàn bộ trang web đã được tải xong
document.addEventListener("DOMContentLoaded", () => {
  // Lấy các phần tử HTML mà chúng ta cần tương tác
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const resultsDiv = document.getElementById("results");
  const API_URL = "http://localhost:8080/api/cities/search";

  // Hàm chính để thực hiện tìm kiếm
  const performSearch = async () => {
    const keyword = searchInput.value.trim();

    // Nếu ô tìm kiếm trống thì không làm gì cả
    if (keyword === "") {
      resultsDiv.innerHTML = "<p>Vui lòng nhập từ khóa để tìm kiếm.</p>";
      return;
    }

    // Hiển thị thông báo đang tải...
    resultsDiv.innerHTML = "<p>Đang tìm kiếm...</p>";

    try {
      // Gọi API từ backend bằng hàm fetch
      // `` là một template string, cho phép chèn biến vào chuỗi
      const response = await fetch(`${API_URL}?name=${keyword}`);

      // Nếu request không thành công (ví dụ: backend sập)
      if (!response.ok) {
        throw new Error(`Lỗi mạng: ${response.status}`);
      }

      // Chuyển dữ liệu trả về từ JSON thành một đối tượng JavaScript
      const cities = await response.json();

      // Gọi hàm để hiển thị kết quả
      displayResults(cities);
    } catch (error) {
      // Nếu có lỗi xảy ra trong quá trình gọi API
      console.error("Đã có lỗi xảy ra:", error);
      resultsDiv.innerHTML =
        "<p>Không thể kết nối đến máy chủ. Vui lòng thử lại sau.</p>";
    }
  };

  // Hàm để hiển thị danh sách kết quả lên trang web
  const displayResults = (cities) => {
    // Xóa các kết quả tìm kiếm cũ
    resultsDiv.innerHTML = "";

    // Nếu không tìm thấy thành phố nào
    if (cities.length === 0) {
      resultsDiv.innerHTML = "<p>Không tìm thấy thành phố nào phù hợp.</p>";
      return;
    }

    // Lặp qua từng thành phố trong danh sách kết quả
    cities.forEach((city) => {
      // Tạo một thẻ div mới cho mỗi thành phố
      const cityElement = document.createElement("div");
      cityElement.className = "city-item"; // Gán class để CSS có thể trang trí

      // Tạo nội dung HTML cho thẻ div
      // toLocaleString('vi-VN') để định dạng số dân cho dễ đọc (vd: 1,234,567)
      cityElement.innerHTML = `
                <h3>${city.name} (${city.countryCode})</h3>
                <p>Khu vực: ${
                  city.district
                } - Dân số: ${city.population.toLocaleString("vi-VN")}</p>
            `;

      // Thêm thẻ div của thành phố vào khu vực kết quả
      resultsDiv.appendChild(cityElement);
    });
  };

  // Gán sự kiện 'click' cho nút tìm kiếm
  searchButton.addEventListener("click", performSearch);

  // Thêm tính năng tìm kiếm khi người dùng nhấn phím "Enter"
  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  });
});
