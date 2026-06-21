import valkey

client = valkey.Valkey(
    host="localhost",
    port=6379,
    decode_responses=True
)

def get_cache(key):
    return client.get(key)

def set_cache(key, value):
    client.set(key, value)

def increment(metric):
    client.incr(metric)

def get_metric(metric):
    value = client.get(metric)
    return int(value) if value else 0
