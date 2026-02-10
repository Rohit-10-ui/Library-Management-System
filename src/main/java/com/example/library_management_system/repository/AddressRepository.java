package com.example.library_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library_management_system.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {} 