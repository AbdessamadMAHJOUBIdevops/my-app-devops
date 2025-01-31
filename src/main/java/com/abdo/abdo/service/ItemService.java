package com.abdo.abdo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.abdo.abdo.model.Item;
import com.abdo.abdo.repository.ItemRepository;

import jakarta.transaction.Transactional;

@Service
public class ItemService {
    private final ItemRepository repository;
    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }
    public List<Item> getAllItems() {
        return repository.findAll();
    }
    public Item addItem(Item item) {
        return repository.save(item);
    }

    @Transactional
    public void deleteItem(Long id){

        repository.deleteById(id);
    }


@Transactional
public Item updateItem(Long id, Item updatedItem){
   

    return repository.findById(id)
       .map(item -> {
        item.setName(updatedItem.getName());
        item.setDescription((updatedItem.getDescription()));
        return repository.save(item);

       })
       .orElseThrow(() ->  new RuntimeException("Item not find with id " + id));
    }

    


}




    

