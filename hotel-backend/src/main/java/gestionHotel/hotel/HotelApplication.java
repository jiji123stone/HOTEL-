package gestionHotel.hotel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class HotelApplication {

  public static void main(String[] args) {
    SpringApplication.run(HotelApplication.class, args);
  }
   // ?useSSL=false&serverTimezone=UTC
  // Configuration CORS
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        // Permet les requêtes CORS depuis http://localhost:4200 (Angular)
        registry.addMapping("/**")
          .allowedOrigins("http://localhost:4200")  // Remplacez par l'URL de votre front-end si nécessaire
          .allowedMethods("GET", "POST", "PUT", "DELETE")
          .allowedHeaders("*");  // Accepte tous les en-têtes
      }
    };
  }
}
