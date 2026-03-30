const API_BASE_URL = "http://127.0.0.1:8000/api";
// const API_BASE_URL = "https://api.kelar.co.id/api";

export const api = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("[API Service] Status respons:", response.status);

    if (!response.ok) {
      console.error("[API Service] Request gagal:", data);
      throw new Error(
        data.meta?.message || "Gagal masuk. Silakan periksa kredensial Anda.",
      );
    }

    // Simpan token ke localStorage
    if (data.data?.access_token) {
      console.log("[API Service] Menyimpan token ke localStorage...");
      localStorage.setItem("kelar_admin_token", data.data.access_token);
      localStorage.setItem("kelar_admin_user", JSON.stringify(data.data.user));
    } else {
      console.warn("[API Service] Token tidak ditemukan dalam respons sukses!");
    }

    return data;
  },

  logout() {
    localStorage.removeItem("kelar_admin_token");
    localStorage.removeItem("kelar_admin_user");
  },

  getToken() {
    return localStorage.getItem("kelar_admin_token");
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  async getCompanySettings() {
    const response = await fetch(`${API_BASE_URL}/company-settings`, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.meta?.message || "Gagal mengambil data.");
    return data.data;
  },

  async updateCompanySettings(data: any) {
    const response = await fetch(`${API_BASE_URL}/company-settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok)
      throw new Error(result.meta?.message || "Gagal memperbarui data.");
    return result.data;
  },

  async getArticles(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/articles?${queryString}`, {
      headers: { Accept: "application/json" },
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.meta?.message || "Gagal mengambil artikel.");
    return data;
  },

  async getArticle(id: string) {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      headers: { Accept: "application/json" },
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.meta?.message || "Gagal mengambil detail artikel.");
    return data.data;
  },

  async createArticle(formData: FormData) {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.meta?.message || "Gagal membuat artikel.");
    return data.data;
  },

  async updateArticle(id: string, formData: FormData) {
    // Backend uses POST for update to support Multi-part
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.meta?.message || "Gagal memperbarui artikel.");
    return data.data;
  },

  async deleteArticle(id: string) {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.meta?.message || "Gagal menghapus artikel.");
    }
    return true;
  },

  async getHeroSliders(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(
      `${API_BASE_URL}/hero-sliders?${queryString}`,
      {
        headers: { Accept: "application/json" },
      },
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.meta?.message || "Gagal mengambil slider.");
    return data;
  },

  async createHeroSlider(formData: FormData) {
    const response = await fetch(`${API_BASE_URL}/hero-sliders`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("[API Service] Validasi gagal:", data.data);
      throw new Error(data.meta?.message || "Gagal membuat slider.");
    }
    return data.data;
  },

  async updateHeroSlider(id: string, formData: FormData) {
    const response = await fetch(`${API_BASE_URL}/hero-sliders/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("[API Service] Validasi gagal:", data.data);
      throw new Error(data.meta?.message || "Gagal memperbarui slider.");
    }
    return data.data;
  },

  async deleteHeroSlider(id: string) {
    const response = await fetch(`${API_BASE_URL}/hero-sliders/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.meta?.message || "Gagal menghapus slider.");
    }
    return true;
  },

  async reorderHeroSlider(id: string, direction: "up" | "down") {
    const response = await fetch(`${API_BASE_URL}/hero-sliders/${id}/reorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify({ direction }),
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.meta?.message || "Gagal mengubah urutan.");
    return data;
  },

  async getPromos() {
    const response = await fetch(`${API_BASE_URL}/promos`, {
      headers: { Accept: "application/json" },
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.meta?.message || "Gagal mengambil promo.");
    return data;
  },

  async createPromo(promoData: any) {
    const response = await fetch(`${API_BASE_URL}/promos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(promoData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Gagal membuat promo.");
    }
    return data.data;
  },

  async updatePromo(id: string, promoData: any) {
    const response = await fetch(`${API_BASE_URL}/promos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(promoData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Gagal memperbarui promo.");
    }
    return data.data;
  },

  async deletePromo(id: string) {
    const response = await fetch(`${API_BASE_URL}/promos/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Gagal menghapus promo.");
    }
    return true;
  },

  async getServices() {
    const response = await fetch(`${API_BASE_URL}/services`, {
      headers: { Accept: "application/json" },
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.meta?.message || "Gagal mengambil layanan.");
    return data;
  },

  async createService(formData: FormData) {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Gagal membuat layanan.");
    }
    return data.data;
  },

  async updateService(id: string, formData: FormData) {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: "POST", // Using POST with _method=PUT for file upload support
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Gagal memperbarui layanan.");
    }
    return data.data;
  },

  async deleteService(id: string) {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Gagal menghapus layanan.");
    }
    return true;
  },
  async reorderService(id: string, direction: "up" | "down") {
    const response = await fetch(`${API_BASE_URL}/services/${id}/reorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify({ direction }),
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.meta?.message || "Gagal mengubah urutan.");
    return data;
  },
  async logAnalytics(data: {
    category: string;
    action: string;
    label?: string;
    value?: number;
    metadata?: any;
  }) {
    // Basic session handling
    let sessionId = sessionStorage.getItem("kelar_session_id");
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem("kelar_session_id", sessionId);
    }

    try {
      console.log("[Analytics] Logging event:", data.category, data.action, data.label);
      const response = await fetch(`${API_BASE_URL}/analytics/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          session_id: sessionId,
          referrer: document.referrer,
        }),
      });
      if (!response.ok) {
        console.error("[Analytics] Error response:", await response.text());
      }
    } catch (e) {
      console.error("[Analytics] Failed to log event:", e);
    }
  },

  async getAnalyticsStats(days: number = 30) {
    const response = await fetch(`${API_BASE_URL}/analytics/stats?days=${days}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Gagal mengambil statistik.");
    return result.data;
  },
};
