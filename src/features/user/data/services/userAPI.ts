export async function fetchUserAPI() {
  const response = await fetch("https://dummyjson.com/users/1");
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return await response.json();
}
