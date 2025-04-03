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
export const probeAssets = async (assets) => {
  try {
    const response = await fetch(`${SERVER_ORIGIN}/asset`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assets),
    });

    if (!response.ok) {
      throw new Error("资产探测失败！");
    }

    const data = await response.json();
    return data; // 返回探测结果
  } catch (error) {
    console.error(error);
    throw new Error("资产探测请求失败！");
  }
};
