const SERVER_ORIGIN = ""; // 服务器地址

// 登录函数
const loginUrl = `${SERVER_ORIGIN}/auth/login`;

export const login = async (username, password) => {
  const response = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "登录失败！");
  }

  const data = await response.json();
  return data.token; // 返回JWT
};

// 注册函数
const registerUrl = `${SERVER_ORIGIN}/auth/register`;

export const register = async (username, password, role) => {
  const response = await fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, role }),
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "注册失败！");
  }

  return "注册成功！";
};

// 资产探测函数
const probeAssetsUrl = `${SERVER_ORIGIN}/asset`;

export const probeAssets = async (assets, token, signal) => {
  try {
    const response = await fetch(probeAssetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(assets), // 将 assets 列表传递到后端
      signal, // 添加 signal 用于中止请求
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "探测失败！");
    }

    const data = await response.json(); // 返回的响应数据是 List<AssetResponse>
    return data; // 返回探测结果
  } catch (error) {
    if (error.name !== "AbortError") {
      throw error; // 重新抛出错误
    }
  }
};
