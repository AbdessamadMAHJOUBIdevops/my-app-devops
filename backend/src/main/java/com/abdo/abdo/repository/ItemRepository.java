
package  com.abdo.abdo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abdo.abdo.model.Item;


public interface ItemRepository extends JpaRepository<Item, Long> {}


