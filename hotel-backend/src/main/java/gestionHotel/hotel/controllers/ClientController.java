package gestionHotel.hotel.controllers;

import gestionHotel.hotel.entities.Client;
import gestionHotel.hotel.services.ClientService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public List<Client> getAllClients() {
        return clientService.findAll();
    }

    @PostMapping
    public Client saveClient(@RequestBody Client client) {
        return clientService.save(client);
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable Long id) {
        clientService.deleteById(id);
    }

    @GetMapping("/email/{email}")
    public Client getClientByEmail(@PathVariable String email) {
        return clientService.getByEmail(email);
    }
}
