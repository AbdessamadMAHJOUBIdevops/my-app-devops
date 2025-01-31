package com.abdo.abdo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abdo.abdo.model.Item;
import com.abdo.abdo.service.ItemService;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService service;
    public ItemController(ItemService service) {
        this.service = service;
    }
    @GetMapping
    public List<Item> getItems() {
        return service.getAllItems();
    }
    @PostMapping
    public Item addItem(@RequestBody Item item) {
        return service.addItem(item);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id){

        service.deleteItem(id);
        return ResponseEntity.ok().build();

    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item item){

        Item updatedItem = service.updateItem(id, item);
        return ResponseEntity.ok(updatedItem);

    }
}
// 