# GIAI ĐOẠN 1: Build ứng dụng với Maven
# Sử dụng alias 'builder' cho giai đoạn này
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file pom.xml trước để tận dụng cache của Docker
# Docker sẽ chỉ chạy lại bước này nếu pom.xml thay đổi
COPY pom.xml .
RUN mvn dependency:go-offline

# Sao chép toàn bộ mã nguồn còn lại
COPY src ./src

# Build ứng dụng, bỏ qua các bài test
RUN mvn clean package -DskipTests

# GIAI ĐOẠN 2: Tạo image runtime cuối cùng
# Sử dụng một image nhỏ gọn hơn
FROM openjdk:21-slim

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file JAR đã được build từ giai đoạn 'builder'
# Thay thế 'your-app-name-*.jar' bằng tên file JAR thực tế của bạn
COPY --from=builder /app/target/*.jar app.jar

# Expose port mà ứng dụng sẽ chạy
EXPOSE 8080

# Lệnh để khởi chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]
