const SERVER_ORIGIN = ""; // 服务器地址

// 登录函数
const loginUrl = `${SERVER_ORIGIN}/auth/login`;

export const login = async (username, password) => {
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("登录失败！");
    }

    const data = await response.json();
    console.log("Login response data:", data.token);  // 打印返回的数据
    return data.token; // 返回JWT
  } catch (error) {
    console.error(error);
    throw new Error("登录请求失败！");
  }
};

// 注册函数
export const register = async (username, password, role) => {
  try {
    const response = await fetch(`${SERVER_ORIGIN}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, role }),
    });

    if (!response.ok) {
      throw new Error("注册失败！");
    }

    return "注册成功！";
  } catch (error) {
    console.error(error);
    throw new Error("注册请求失败！");
  }
};

// 资产探测函数
export const probeAssets = async (assets, token) => {
  try {
    
    const response = await fetch(`${SERVER_ORIGIN}/asset`, {
      method: "POST", // 改为 POST 请求
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(assets), // 将 assets 列表传递到后端
    });

    if (!response.ok) {
      throw new Error("资产探测失败！");
    }

    const data = await response.json(); // 返回的响应数据是 List<AssetResponse>
    return data; // 返回探测结果
  } catch (error) {
    console.error(error);
    throw new Error("资产探测请求失败！");
  }
};
