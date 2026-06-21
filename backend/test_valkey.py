import valkey

client = valkey.Valkey(
    host="localhost",
    port=6379,
    decode_responses=True
)

client.set("name", "Pravalika")

print(client.get("name"))