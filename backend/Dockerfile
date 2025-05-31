FROM python:3.11-slim-bookworm AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    g++ \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

FROM python:3.11-slim-bookworm

WORKDIR /app

RUN apt-get update && apt-get install -y \
    postgresql-client \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd --system --gid 1001 backend && \
    useradd --system --uid 1001 --gid backend backend && \
    chown -R backend:backend /app

COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY --from=builder /app /app

RUN chown -R backend:backend /app/uploads
RUN chown -R backend:backend /app/visualized_image
USER backend

EXPOSE 8080

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]