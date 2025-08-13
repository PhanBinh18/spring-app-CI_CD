package com.example.demo1.repository;


import com.example.demo1.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {

    // Tìm các thành phố có 'name' bắt đầu bằng từ khóa, không phân biệt hoa thường
    // Chúng ta cũng có thể giới hạn số lượng kết quả, ví dụ lấy 20 thành phố đầu tiên
    List<City> findByNameStartingWithIgnoreCase(String name);
}
