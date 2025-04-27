package gestionHotel.hotel.services;

import gestionHotel.hotel.entities.Client;
import gestionHotel.hotel.repositories.ClientRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    public Client save(Client client) {
        return clientRepository.save(client);
    }

    public void deleteById(Long id) {
        clientRepository.deleteById(id);
    }

    public Client getByEmail(String email) {
        List<Client> l = clientRepository.findAll();
        return l.stream()
                .filter(client -> client.getEmail().equalsIgnoreCase(email))
                .findFirst()
                .orElse(null); // retourne null si pas trouvé
    }

}
