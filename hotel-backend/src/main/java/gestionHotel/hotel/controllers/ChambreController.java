package gestionHotel.hotel.controllers;

import gestionHotel.hotel.entities.Chambre;
import gestionHotel.hotel.services.ChambreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chambres")
public class ChambreController {

    private final ChambreService chambreService;

    public ChambreController(ChambreService chambreService) {
        this.chambreService = chambreService;
    }

    @GetMapping
    public List<Chambre> getAllChambres() {
        return chambreService.findAll();
    }

    @PostMapping
    public Chambre saveChambre(@RequestBody Chambre chambre) {
        return chambreService.save(chambre);
    }

    @DeleteMapping("/{id}")
    public void deleteChambre(@PathVariable Long id) {
        chambreService.deleteById(id);
    }
}
