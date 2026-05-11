import json

from src.pipeline.etl_pipeline import run_partner_pipeline


def main() -> None:
    print(json.dumps(run_partner_pipeline(), indent=2))


if __name__ == "__main__":
    main()
