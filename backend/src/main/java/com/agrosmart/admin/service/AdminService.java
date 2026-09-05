package com.agrosmart.admin.service;

import com.agrosmart.admin.dto.AdminStatsDto;
import com.agrosmart.common.exception.ResourceNotFoundException;
import com.agrosmart.farmer.repository.FarmerCropRepository;
import com.agrosmart.farmer.repository.FarmerLandRepository;
import com.agrosmart.user.entity.Role;
import com.agrosmart.user.entity.User;
import com.agrosmart.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final FarmerLandRepository farmerLandRepository;
    private final FarmerCropRepository farmerCropRepository;

    public AdminService(UserRepository userRepository, FarmerLandRepository farmerLandRepository,
            FarmerCropRepository farmerCropRepository) {
        this.userRepository = userRepository;
        this.farmerLandRepository = farmerLandRepository;
        this.farmerCropRepository = farmerCropRepository;
    }

    @Transactional(readOnly = true)
    public AdminStatsDto getSystemStats() {
        return AdminStatsDto.builder()
                .totalUsers(userRepository.count())
                .activeUsers(userRepository.countByIsActive(true))
                .inactiveUsers(userRepository.countByIsActive(false))
                .totalFarmers(userRepository.countByRole(Role.FARMER))
                .totalDealers(userRepository.countByRole(Role.DEALER))
                .totalConsumers(userRepository.countByRole(Role.CONSUMER))
                .totalGovtOfficers(userRepository.countByRole(Role.GOVT_OFFICER))
                .totalLands(farmerLandRepository.count())
                .totalCropsSown(farmerCropRepository.count())
                .build();
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public void deactivateUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        user.setIsActive(false);
        userRepository.save(user);
    }

    @Transactional
    public void activateUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        user.setIsActive(true);
        userRepository.save(user);
    }
}
