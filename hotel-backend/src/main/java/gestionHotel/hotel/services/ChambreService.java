package gestionHotel.hotel.services;

import gestionHotel.hotel.entities.Chambre;
import gestionHotel.hotel.repositories.ChambreRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChambreService {

    private final ChambreRepository chambreRepository;

    public ChambreService(ChambreRepository chambreRepository) {
        this.chambreRepository = chambreRepository;
    }

    public List<Chambre> findAll() {
        return chambreRepository.findAll();
    }

    public Chambre save(Chambre chambre) {
        return chambreRepository.save(chambre);
    }

    public void deleteById(Long id) {
        chambreRepository.deleteById(id);
    }

  public Chambre findById(Long id) {
    return chambreRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Chambre non trouvée avec l'ID : " + id));
  }

}
