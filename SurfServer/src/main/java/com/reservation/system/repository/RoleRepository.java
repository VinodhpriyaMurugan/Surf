package com.reservation.system.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.reservation.system.entity.Role;
import com.reservation.system.entity.User;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

	@Query(value= "select * from role where user_id = ?1",nativeQuery = true)
	List<Role> findByUserId(Integer id);

	@Transactional
	@Modifying
	@Query(value= "delete from role where user_id = ?1 AND name = 'ROLE_ADMIN'",nativeQuery = true)
	void deleteAdminAcess(Integer id);

	@Query(value= "select * from role where name = 'ROLE_ADMIN'",nativeQuery = true)
	List<Role> findUserByRole();

}
