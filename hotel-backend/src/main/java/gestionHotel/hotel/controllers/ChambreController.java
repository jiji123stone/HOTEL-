package gestionHotel.hotel.controllers;

import gestionHotel.hotel.entities.Chambre;
import gestionHotel.hotel.services.ChambreService;
import org.springframework.http.ResponseEntity;
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
  public ResponseEntity<?> deleteChambre(@PathVariable Long id) {
    try {
      chambreService.deleteById(id);
      return ResponseEntity.ok().build();
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Erreur lors de la suppression de la chambre");
    }
  }

  @PatchMapping("/{id}")
  public Chambre updateReservedStatus(@PathVariable Long id, @RequestBody Chambre chambreUpdate) {
    Chambre existingChambre = chambreService.findById(id);
    if (existingChambre != null) {
      existingChambre.setReserved(chambreUpdate.getReserved());
      return chambreService.save(existingChambre);
    } else {
      throw new RuntimeException("Chambre non trouvée avec l'ID : " + id);
    }
  }




  @PutMapping("/{id}")
  public Chambre updateChambre(@PathVariable Long id, @RequestBody Chambre chambre) {
    Chambre existingChambre = chambreService.findById(id);
    if (existingChambre != null) {
      existingChambre.setNumero(chambre.getNumero());
      existingChambre.setType(chambre.getType());
      existingChambre.setCapacite(chambre.getCapacite());
      existingChambre.setEquipements(chambre.getEquipements());
      existingChambre.setTarif(chambre.getTarif());
      existingChambre.setStar(chambre.getStar());
      existingChambre.setReserved(chambre.getReserved());
      existingChambre.setUrlImage(chambre.getUrlImage());
      return chambreService.save(existingChambre);
    } else {
      throw new RuntimeException("Chambre non trouvée avec l'ID : " + id);
    }
  }

}
