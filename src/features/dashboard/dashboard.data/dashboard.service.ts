import { apiClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../core/constants/api.constants';
import type { DashboardResponse } from '../dashboard.domain/dashboard.types';

/**
 * Servicio para obtener los datos del dashboard
 */
export const dashboardService = {
  /**
   * Obtiene el resumen financiero completo del dashboard
   * @returns Promise con los datos del dashboard
   */
  async getDashboard(): Promise<DashboardResponse> {
    const response = await apiClient.get<DashboardResponse>(
      API_ENDPOINTS.DASHBOARD
    );
    return response.data;
  },
};

